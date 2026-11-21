import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCRATCH_CARDS } from "../config.js";
import { celebrate } from "./Sparkles.jsx";

export default function ScratchCard() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);

  const currentCard = SCRATCH_CARDS[cardIndex];

  // Draw the initial gold foil layer on the canvas
  const initFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#a9812f");
    grad.addColorStop(0.25, "#d4af6a");
    grad.addColorStop(0.5, "#faecc6");
    grad.addColorStop(0.75, "#d4af6a");
    grad.addColorStop(1, "#8a661f");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative golden sparkles & border pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    ctx.strokeStyle = "rgba(11, 46, 34, 0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(18, 18, w - 36, h - 36);

    // Golden shine particles
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    for (let i = 0; i < 40; i++) {
      const px = Math.random() * w;
      const py = Math.random() * h;
      const pr = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Calligraphy & scratch text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#06201a";
    ctx.font = "bold 13px Poppins, sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2 - 24);

    ctx.fillStyle = "#0b2e22";
    ctx.font = "italic 32px 'Great Vibes', cursive";
    ctx.fillText("Doctor's Blessing", w / 2, h / 2 + 10);

    ctx.fillStyle = "#3a2c0c";
    ctx.font = "12px Poppins, sans-serif";
    ctx.fillText("Rub with your finger or cursor ✨", w / 2, h / 2 + 42);

    setIsRevealed(false);
    setScratchPercent(0);
  };

  useEffect(() => {
    initFoil();
  }, [cardIndex]);

  // Scratch action
  const scratch = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPos.current = { x, y };
  };

  // Check how much is scratched
  const checkScratchPercentage = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // Sample pixels at step intervals of 16 for high speed
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let clearCount = 0;
      let totalSamples = 0;
      const step = 16 * 4;

      for (let i = 3; i < data.length; i += step) {
        totalSamples++;
        if (data[i] < 128) {
          clearCount++;
        }
      }

      const percent = Math.round((clearCount / totalSamples) * 100);
      setScratchPercent(percent);

      if (percent >= 40) {
        setIsRevealed(true);
        celebrate();
      }
    } catch (e) {
      // Fallback
    }
  };

  const onPointerDown = (e) => {
    isDrawing.current = true;
    lastPos.current = null;
    scratch(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    isDrawing.current = false;
    lastPos.current = null;
    checkScratchPercentage();
  };

  const nextCard = () => {
    const nextIdx = (cardIndex + 1) % SCRATCH_CARDS.length;
    setCardIndex(nextIdx);
  };

  return (
    <section id="scratch-section" style={{ position: "relative" }}>
      <div className="wrap">
        <p className="eyebrow">Interactive Surprise</p>
        <h2 className="title">
          Golden <span className="gold-text">Scratch Card</span> 🎟️
        </h2>
        <p
          className="serif"
          style={{
            textAlign: "center",
            color: "var(--ivory-dim)",
            fontSize: "1.15rem",
            maxWidth: 600,
            margin: "0 auto 10px",
          }}
        >
          Scratch off the golden foil to reveal special wedding blessings & sweet surprises from Dr. Gokulraj & Dr. Megala!
        </p>
        <div className="divider" />

        <div className="scratch-card-wrapper">
          <div className="scratch-card-box glass">
            {/* The revealed surprise content underneath */}
            <div className="scratch-revealed-content">
              <div className="scratch-badge">{currentCard.tag}</div>
              <div className="scratch-photo-wrap">
                <img src={currentCard.image} alt={currentCard.title} />
              </div>
              <h3 className="gold-text" style={{ fontSize: "1.45rem", margin: "10px 0 6px" }}>
                {currentCard.title}
              </h3>
              <p className="serif" style={{ fontSize: "1.15rem", color: "var(--ivory)", lineHeight: 1.6, padding: "0 10px" }}>
                "{currentCard.message}"
              </p>
              <div className="script" style={{ fontSize: "1.7rem", color: "var(--gold)", marginTop: 12 }}>
                {currentCard.quote}
              </div>
            </div>

            {/* The scratchable HTML5 Canvas overlay */}
            <motion.canvas
              ref={canvasRef}
              className="scratch-canvas"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              animate={{ opacity: isRevealed ? 0 : 1 }}
              transition={{ duration: 0.6 }}
              style={{
                pointerEvents: isRevealed ? "none" : "auto",
                touchAction: "none",
              }}
            />
          </div>

          {/* Controls & Next button */}
          <div className="scratch-controls">
            {/* <div className="stat-pill" style={{ display: "inline-flex" }}>
              <span>Scratched:</span> <b>{isRevealed ? "100%" : `${scratchPercent}%`}</b>
            </div> */}

            <button className="btn" onClick={nextCard} style={{ marginLeft: 12 }}>
               Next Surprise Card ({cardIndex + 1}/{SCRATCH_CARDS.length})
            </button>

            <button
              className="btn ghost"
              onClick={() => {
                initFoil();
              }}
              style={{ marginLeft: 8 }}
            >
               Reset Card
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
