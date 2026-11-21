import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { celebrate } from "./Sparkles.jsx";

// Edit these texts. This is what the guest sees after scratching.
const CARD = {
  heading: "Scratch & Reveal",
  hint: "Use your finger or mouse",
  small: "Save the date",
  big: "22 & 23 November 2026",
  note: "Kallakurichi · We can't wait to celebrate with you",
};

const AUTO_REVEAL_AT = 0.5; // reveal fully after 50% is scratched

export default function ScratchCard() {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const drawing = useRef(false);
  const moveCount = useRef(0);
  const [done, setDone] = useState(false);

  // Paint the gold foil layer
  useEffect(() => {
    const c = canvas.current;
    const w = wrap.current.clientWidth;
    const h = wrap.current.clientHeight;
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#f3dc9a");
    g.addColorStop(0.5, "#c9a24f");
    g.addColorStop(1, "#e8cd82");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // little sparkle dots for a foil feel
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.35})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }

    ctx.fillStyle = "rgba(60,40,0,0.7)";
    ctx.font = "600 18px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH HERE ✦", w / 2, h / 2);
  }, []);

  const scratch = (e) => {
    if (!drawing.current || done) return;
    const c = canvas.current;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = c.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check how much is cleared, but not on every move (it is slow)
    moveCount.current += 1;
    if (moveCount.current % 8 === 0) {
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let cleared = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 64) {
        total++;
        if (data[i] === 0) cleared++;
      }
      if (cleared / total > AUTO_REVEAL_AT) {
        setDone(true);
        celebrate();
      }
    }
  };

  return (
    <section
      id="scratch"
      style={{ padding: "90px 20px", textAlign: "center", position: "relative", zIndex: 2 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="script gold-text" style={{ fontSize: "3rem", margin: 0 }}>
          {CARD.heading}
        </h2>
        <p className="serif" style={{ color: "var(--gold-soft)", fontSize: "1.2rem", margin: "10px 0 28px" }}>
          {CARD.hint}
        </p>

        <div
          ref={wrap}
          style={{
            position: "relative",
            width: "min(340px, 88vw)",
            height: 200,
            margin: "0 auto",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid var(--gold-soft)",
            background: "rgba(0,0,0,0.35)",
          }}
        >
          {/* Hidden message under the foil */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: 16,
            }}
          >
            <span className="serif" style={{ color: "var(--gold-soft)", fontStyle: "italic" }}>
              {CARD.small}
            </span>
            <span className="serif gold-text" style={{ fontSize: "1.7rem" }}>
              {CARD.big}
            </span>
            <span style={{ color: "var(--gold-soft)", fontSize: "0.8rem", opacity: 0.85 }}>
              {CARD.note}
            </span>
          </div>

          {/* Foil layer */}
          <canvas
            ref={canvas}
            onPointerDown={(e) => {
              drawing.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratch(e);
            }}
            onPointerMove={scratch}
            onPointerUp={() => (drawing.current = false)}
            onPointerCancel={() => (drawing.current = false)}
            style={{
              position: "absolute",
              inset: 0,
              cursor: "crosshair",
              touchAction: "none", // stops the page from scrolling while scratching
              opacity: done ? 0 : 1,
              pointerEvents: done ? "none" : "auto",
              transition: "opacity 0.8s",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}