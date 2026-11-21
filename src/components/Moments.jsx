import { motion } from "framer-motion";
import { PHOTOS } from "../config.js";

// Real photos from megala_photos for each polaroid card with authentic matching captions
const CARDS = [
  { cap: "Two Hearts, One Ride 🛵💛", img: "/megala_photos/scoter.png", bg: "140%", pos: "42% 20%", rot: -7, delay: 0 },
  { cap: "Endless Horizon with You 🌊🌅", img: "/megala_photos/kai.png", bg: "140%", pos: "50% 28%", rot: 5, delay: 0.4 },
  { cap: "Chasing Waves Together 🌊👣", img: "/megala_photos/moment3.png", bg: "140%", pos: "50% 35%", rot: -3, delay: 0.8 },
  { cap: "Street Cafes & Sweet Chats ☕🏛️", img: "/megala_photos/moment4.png", bg: "100%", pos: "50% 30%", rot: 8, delay: 1.2 },
  { cap: "Sun-Kissed Blushes 🌸🏖️", img: "/megala_photos/moment5.png", bg: "140%", pos: "50% 30%", rot: -6, delay: 1.6 },
];

export default function Moments() {
  return (
    <section style={{ overflow: "hidden" }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Moments</p>
          <h2 className="title">Drag the Memories 📸</h2>
          <p className="serif" style={{ textAlign: "center", color: "var(--ivory-dim)", fontSize: "1.1rem" }}>
            Pick any photo & fling it around — it always comes back!
          </p>
          <div className="divider" />
        </motion.div>
        <div className="polaroids">
          {CARDS.map((c, i) => (
            <motion.div
              key={i}
              className="polaroid"
              initial={{ opacity: 0, y: 80, rotate: c.rot * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: c.rot }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, type: "spring", stiffness: 80 }}
              drag
              dragSnapToOrigin
              dragElastic={0.6}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 5 }}
              whileDrag={{ scale: 1.15, zIndex: 10, cursor: "grabbing" }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
              >
                <div
                  className="polaroid-img"
                  style={{ backgroundImage: `url(${c.img || PHOTOS.couple})`, backgroundSize: c.bg, backgroundPosition: c.pos }}
                />
                <span className="script" style={{ fontSize: "1.5rem", color: "#0b2e22" }}>{c.cap}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
