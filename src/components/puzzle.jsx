import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PUZZLE_CONFIG } from "../config.js";
import { celebrate } from "./Sparkles.jsx";

const GRID = 3;
const TOTAL_TILES = GRID * GRID; // 9

/*
  Edge map for a 3x3 jigsaw.
  1 = tab sticks OUT, -1 = socket cut IN, 0 = flat outer border.
  Every shared edge is complementary (tab <-> socket), so neighbours lock together.
*/
const JIGSAW_EDGES = [
  { top: 0, right: 1, bottom: -1, left: 0 },   // 0
  { top: 0, right: 1, bottom: 1, left: -1 },   // 1
  { top: 0, right: 0, bottom: -1, left: -1 },  // 2
  { top: 1, right: -1, bottom: 1, left: 0 },   // 3
  { top: -1, right: -1, bottom: -1, left: 1 }, // 4
  { top: 1, right: 0, bottom: 1, left: 1 },    // 5
  { top: -1, right: 1, bottom: 0, left: 0 },   // 6
  { top: 1, right: 1, bottom: 0, left: -1 },   // 7
  { top: -1, right: 0, bottom: 0, left: -1 },  // 8
];

/*
  One tab, described once as (along-edge fraction, height fraction).
  It is symmetric around 0.5, so a tab on one piece and the socket on its
  neighbour are the exact same curve => perfect fit.
*/
const TAB_START = [0.36, 0];
const TAB = [
  [0.42, 0, 0.43, 0.03, 0.42, 0.07],     // neck goes up
  [0.4, 0.1, 0.3, 0.22, 0.5, 0.22],      // flares into the round head (left half)
  [0.7, 0.22, 0.6, 0.1, 0.58, 0.07],     // head (right half) back to neck
  [0.57, 0.03, 0.58, 0, 0.64, 0],        // neck returns to the edge
];

// Builds the path for ONE edge, travelling clockwise from (x0,y0) to (x1,y1).
function edgePath(x0, y0, x1, y1, s, L) {
  if (!s) return `L ${x1} ${y1} `;
  const tx = (x1 - x0) / L;
  const ty = (y1 - y0) / L;
  const nx = ty;   // outward normal for a clockwise path in screen coordinates
  const ny = -tx;
  const P = (a, v) => `${x0 + tx * a * L + nx * v * L * s} ${y0 + ty * a * L + ny * v * L * s}`;
  let d = `L ${P(TAB_START[0], TAB_START[1])} `;
  TAB.forEach((c) => {
    d += `C ${P(c[0], c[1])}, ${P(c[2], c[3])}, ${P(c[4], c[5])} `;
  });
  return d + `L ${x1} ${y1} `;
}

function makeJigsawPath(top, right, bottom, left, L = 100) {
  return (
    `M 0 0 ` +
    edgePath(0, 0, L, 0, top, L) +
    edgePath(L, 0, L, L, right, L) +
    edgePath(L, L, 0, L, bottom, L) +
    edgePath(0, L, 0, 0, left, L) +
    "Z"
  );
}

// Which part of the photo to keep when it is cropped to a square
const FOCUS = {
  top: { svg: "xMidYMin", css: "50% 0%" },
  center: { svg: "xMidYMid", css: "50% 50%" },
  bottom: { svg: "xMidYMax", css: "50% 100%" },
};

// Guaranteed-solvable scramble generator (Fisher-Yates)
const generateScramble = () => {
  let current = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = current.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [current[i], current[j]] = [current[j], current[i]];
  }
  while (current.every((val, idx) => val === idx)) {
    [current[0], current[1]] = [current[1], current[0]];
  }
  return current;
};

// Layout rules so the pieces truly touch and tabs can overlap their neighbours
const FIX_CSS = `
.puzzle-royal-frame .puzzle-board-grid{
  display:grid; grid-template-columns:repeat(${GRID},1fr); grid-template-rows:repeat(${GRID},1fr);
  gap:0 !important; padding:0 !important; aspect-ratio:1/1; overflow:visible !important;
}
.puzzle-royal-frame .puzzle-tile-item{
  overflow:visible !important; border-radius:0 !important; background:none !important;
  border:0 !important; box-shadow:none !important; padding:0 !important; outline:none;
}
`;

export default function Puzzle() {
  const [selectedPhoto, setSelectedPhoto] = useState(PUZZLE_CONFIG.photos[0].src);
  const [tiles, setTiles] = useState(generateScramble);
  const [selectedPos, setSelectedPos] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const timerRef = useRef(null);

  const currentPhoto =
    PUZZLE_CONFIG.photos.find((p) => p.src === selectedPhoto) || PUZZLE_CONFIG.photos[0];
  const focus = FOCUS[currentPhoto.focus] || FOCUS.center;

  useEffect(() => {
    if (isPlaying && !isSolved) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, isSolved]);

  const handlePieceClick = (clickedPos) => {
    if (isSolved) return;

    if (selectedPos === null) {
      setSelectedPos(clickedPos);
    } else if (selectedPos === clickedPos) {
      setSelectedPos(null);
    } else {
      const nextTiles = [...tiles];
      const temp = nextTiles[selectedPos];
      nextTiles[selectedPos] = nextTiles[clickedPos];
      nextTiles[clickedPos] = temp;

      setTiles(nextTiles);
      setMoves((m) => m + 1);
      setSelectedPos(null);
      if (!isPlaying) setIsPlaying(true);

      if (nextTiles.every((val, idx) => val === idx)) {
        setIsSolved(true);
        setIsPlaying(false);
        celebrate();
      }
    }
  };

  const resetGame = (photoSrc) => {
    if (photoSrc) setSelectedPhoto(photoSrc);
    setTiles(generateScramble());
    setSelectedPos(null);
    setMoves(0);
    setSeconds(0);
    setIsSolved(false);
    setIsPlaying(true);
  };

  const scramble = () => resetGame();

  const autoSolve = () => {
    setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setSelectedPos(null);
    setIsSolved(true);
    setIsPlaying(false);
    celebrate();
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section id="puzzle-section" className="puzzle-royal-section" style={{ position: "relative", overflow: "hidden" }}>
      <style>{FIX_CSS}</style>
      <div className="puzzle-glow-aura" />

      <div className="wrap">
        <h2 className="title">
          Doctor Couple's <span className="gold-text">Royal Puzzle</span> 🧩
        </h2>
        <p
          className="serif"
          style={{
            textAlign: "center",
            color: "var(--ivory-dim)",
            fontSize: "1.2rem",
            maxWidth: 640,
            margin: "0 auto 10px",
          }}
        >
          {selectedPos !== null ? (
            <span style={{ color: "var(--gold)" }}>
              ✦ <b>Piece Selected!</b> Tap any other piece to swap them into place.
            </span>
          ) : (
            <span>
              Tap any puzzle piece to pick it up, then tap another to swap them into place!
            </span>
          )}
        </p>
        <div className="divider" />

        {/* Photo selector */}
        <div className="puzzle-photo-shelf">
          {PUZZLE_CONFIG.photos.map((p) => {
            const isSelected = selectedPhoto === p.src;
            return (
              <motion.button
                key={p.id}
                onClick={() => resetGame(p.src)}
                className={`puzzle-photo-card glass ${isSelected ? "active" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="puzzle-card-thumb">
                  <img src={p.src} alt={p.label} />
                  {isSelected && <span className="active-dot">✦ Active</span>}
                </div>
                <div className="puzzle-card-meta">
                  <b>{p.label}</b>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="puzzle-royal-stage glass">
          <div className="puzzle-arena">
            <div className={`puzzle-royal-frame ${isSolved ? "solved-aura" : ""}`}>
              <span className="corner-ornament tl">✦</span>
              <span className="corner-ornament tr">✦</span>
              <span className="corner-ornament bl">✦</span>
              <span className="corner-ornament br">✦</span>

              <div className="puzzle-board-grid">
                {tiles.map((pieceId, currentPos) => {
                  const isCorrect = pieceId === currentPos;
                  const isSelected = selectedPos === currentPos;
                  const origRow = Math.floor(pieceId / GRID);
                  const origCol = pieceId % GRID;
                  const edge = JIGSAW_EDGES[pieceId];
                  const pathD = makeJigsawPath(edge.top, edge.right, edge.bottom, edge.left, 100);
                  const clipId = `jigsaw-clip-${pieceId}`;

                  return (
                    <motion.div
                      key={pieceId}
                      layout
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                      onClick={() => handlePieceClick(currentPos)}
                      className={`puzzle-tile-item ${isSelected ? "selected-tile" : ""} ${
                        isCorrect ? "in-place" : ""
                      }`}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        cursor: isSolved ? "default" : "pointer",
                        overflow: "visible",
                        zIndex: isSelected ? 30 : isCorrect ? 1 : 2,
                      }}
                      whileHover={!isSolved ? { scale: 1.05, zIndex: 12 } : {}}
                      whileTap={!isSolved ? { scale: 0.95 } : {}}
                    >
                      {/* viewBox = the piece's body exactly (0..100); tabs spill out of it */}
                      <svg
                        viewBox="0 0 100 100"
                        className={`jigsaw-svg-piece ${isSelected ? "selected" : ""}`}
                        style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}
                      >
                        <defs>
                          <clipPath id={clipId}>
                            <path d={pathD} />
                          </clipPath>
                        </defs>

                        {/* This piece's slice of the photo (square crop, never stretched) */}
                        <g clipPath={`url(#${clipId})`}>
                          <image
                            href={selectedPhoto}
                            x={-origCol * 100}
                            y={-origRow * 100}
                            width="300"
                            height="300"
                            preserveAspectRatio={`${focus.svg} slice`}
                          />
                          {isSelected && <path d={pathD} fill="rgba(212, 175, 106, 0.35)" />}
                        </g>

                        {/* Die-cut outline */}
                        <path
                          d={pathD}
                          fill="none"
                          strokeLinejoin="round"
                          stroke={isSelected ? "#ffffff" : isCorrect ? "#e7cc8b" : "rgba(212, 175, 106, 0.75)"}
                          strokeWidth={isSelected ? "2.4" : isCorrect ? "1.6" : "1.3"}
                          style={{
                            filter: isSelected
                              ? "drop-shadow(0 0 6px #d4af6a)"
                              : isCorrect
                              ? "drop-shadow(0 0 3px rgba(212,175,106,0.6))"
                              : "drop-shadow(0 2px 3px rgba(0,0,0,0.5))",
                            transition: "stroke 0.25s, stroke-width 0.25s",
                          }}
                        />
                      </svg>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {isSolved && (
                  <motion.div
                    className="solved-plaque"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <span className="script" style={{ fontSize: "1.8rem", color: "#1a1205" }}>
                      Dr. Gokulraj & Dr. Megala
                    </span>
                    <small>A Perfect Match ❤️ Forever United</small>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hint: same square crop as the pieces, so it matches exactly */}
            <AnimatePresence>
              {showPreview && (
                <motion.div
                  className="puzzle-reference-easel glass"
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="easel-header">
                    <span className="script" style={{ fontSize: "1.3rem", color: "var(--gold)" }}>
                      Target Portrait
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPreview(false)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--gold)",
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        padding: "2px 6px",
                      }}
                      aria-label="Close Hint"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="easel-image-frame">
                    <img
                      src={selectedPhoto}
                      alt="Target couple portrait"
                      style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", objectPosition: focus.css }}
                    />
                    <div className="easel-corner-accent" />
                  </div>
                  <p className="easel-hint">Arrange the jigsaw pieces to match this photo!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="puzzle-controls-bar">
            <button
              type="button"
              className={`btn ${showPreview ? "" : "ghost"} royal-hint-btn`}
              onClick={() => setShowPreview((prev) => !prev)}
            >
              <span></span>
              <span>{showPreview ? "Hide Hint" : "Hint"}</span>
            </button>

            <button className="btn royal-shuffle-btn" onClick={scramble}>
              <span></span>
              <span>Shuffle Puzzle</span>
            </button>

            <button className="btn ghost royal-solve-btn" onClick={autoSolve}>
              <span></span>
              <span>Instant Solve</span>
            </button>
          </div>

          <AnimatePresence>
            {isSolved && moves > 0 && (
              <motion.div
                className="puzzle-victory-banner"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="victory-stars">⭐⭐⭐⭐⭐</div>
                <h3 className="gold-text" style={{ fontSize: "2rem", margin: "6px 0" }}>
                  Royal Puzzle Completed! 
                </h3>
                <p className="serif" style={{ fontSize: "1.25rem", color: "var(--ivory)", margin: "8px 0 16px" }}>
                  Masterfully solved in <b>{moves} moves</b> and <b>{formatTime(seconds)}</b>!
                  <br />
                  <span style={{ fontSize: "0.95rem", color: "var(--gold-soft)" }}>
                    You have unlocked special wedding blessings from Dr. Gokulraj & Dr. Megala 🩺💚
                  </span>
                </p>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="btn" onClick={scramble}>
                    Play Again 
                  </button>
                  <button
                    className="btn ghost"
                    onClick={() => {
                      const idx = PUZZLE_CONFIG.photos.findIndex((p) => p.src === selectedPhoto);
                      const next = PUZZLE_CONFIG.photos[(idx + 1) % PUZZLE_CONFIG.photos.length];
                      resetGame(next.src);
                    }}
                  >
                    Next Photo 
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}