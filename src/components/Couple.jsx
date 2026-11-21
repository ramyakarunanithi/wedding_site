import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { COUPLE, PHOTOS } from "../config.js";
import { celebrate } from "./Sparkles.jsx";

const EASE = [0.22, 1, 0.36, 1];

const up = (d = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay: d, ease: EASE },
});

/* text inside each card reveals one-by-one (blur -> sharp) after the card lands */
const cardV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.55 } },
};
const itemV = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};
const shineV = {
  hidden: { x: "-160%", opacity: 0 },
  show: { x: "380%", opacity: 1, transition: { delay: 1.0, duration: 1.4, ease: "easeInOut" } },
};
const spotV = { hidden: { opacity: 0 }, show: { opacity: 0 }, hover: { opacity: 1 } };

function Person({ p, side }) {
  const reduce = useReducedMotion();
  const dir = side === "l" ? -1 : 1;

  /* mouse tilt + moving spotlight */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 150, damping: 18 });
  const px = useTransform(mx, (v) => v * 100);
  const py = useTransform(my, (v) => v * 100);
  const spot = useMotionTemplate`radial-gradient(280px circle at ${px}% ${py}%, color-mix(in srgb, var(--gold) 22%, transparent), transparent 70%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const vp = { once: true, margin: "-80px" };
  const fly = reduce
    ? { opacity: 0 }
    : { opacity: 0, x: dir * 140, y: dir * 70, rotate: dir * 10, scale: 0.92 };

  return (
    <motion.div
      className="cp2-slot"
      initial={fly}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={vp}
      transition={{
        type: "spring", stiffness: 60, damping: 11, mass: 1.1,
        delay: side === "r" ? 0.12 : 0,
        opacity: { duration: 0.5, delay: side === "r" ? 0.12 : 0 },
      }}
    >
      {/* two cards peeking out from behind, same glass style so colours stay yours */}
      {[1, 2].map((n) => (
        <motion.div
          key={n}
          className="glass cp2-ghost"
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          whileInView={{ opacity: n === 1 ? 0.55 : 0.3, x: dir * 14 * n, y: 12 * n, rotate: dir * 3 * n }}
          viewport={vp}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.9 + n * 0.12 }}
        />
      ))}

      <motion.div
        className="glass person"
        style={{ rotateX, rotateY, transformPerspective: 900, position: "relative" }}
        variants={cardV}
        initial="hidden"
        whileInView="show"
        whileHover="hover"
        viewport={vp}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="cp2-clip">
          <motion.div className="cp2-spot" style={{ background: spot }} variants={spotV} transition={{ duration: 0.3 }} />
          <motion.div className="cp2-shine" variants={shineV} />
        </div>

        <motion.div variants={itemV} className="cp2-emblem">
          <motion.span
            className="cp2-pulse"
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            style={{ fontSize: "2.2rem" }}
            animate={{ rotate: [-12, 12, -12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚕️
          </motion.div>
        </motion.div>

        <motion.h3 className="gold-text" variants={itemV}>{p.name}</motion.h3>
        <motion.div className="role" variants={itemV}>{p.degree}</motion.div>
        <motion.div className="role" style={{ color: "var(--ivory)" }} variants={itemV}>{p.role}</motion.div>
        <motion.p variants={itemV}>{p.parents}<br />{p.place}</motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Couple() {
  const frame = useRef(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section>
      <style>{CSS}</style>
      <div className="wrap">
        <motion.p className="eyebrow" {...up()}>The Couple</motion.p>
        <motion.h2 className="title" {...up(0.1)}>Two Doctors, One Heart</motion.h2>
        <div className="divider" />

        <div className="couple-grid">
          <Person p={COUPLE.groom} side="l" />

          {/* "weds" pops in right after both cards lock, with a ripple from the seam */}
          <motion.div
            className="weds"
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
            initial={{ opacity: 0, scale: 0.3, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 9, delay: 1.4 }}
          >
            <motion.span
              className="cp2-ripple"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: [0.8, 0], scale: [0.4, 2.6] }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
            />
            <motion.span
              className="script gold-text"
              style={{ display: "inline-block" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
            >
              weds
            </motion.span>
          </motion.div>

          <Person p={COUPLE.bride} side="r" />
        </div>

        <motion.div className="photo-orbit" {...up(0.1)}>
          <div className="ring r1" /><div className="ring r2" />
          {["💚", "✨", "", "💛", "🩺", "✨"].map((e, i) => (
            <motion.span
              key={i}
              className="float-emoji"
              style={{ left: `${8 + i * 17}%`, top: `${[10, 60, 25, 75, 40, 85][i]}%` }}
              animate={{ y: [0, -24, 0], rotate: [0, 12, -12, 0] }}
              transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >{e}</motion.span>
          ))}
          <motion.div className="photo-frame" ref={frame} whileHover={{ scale: 1.03 }} onClick={celebrate} style={{ cursor: "pointer" }}>
            <motion.img
              src={PHOTOS.couple}
              alt="Gokulraj and Megala"
              style={{ y, scale: 1.15 }}
              animate={{ scale: [1.15, 1.25, 1.15] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <p className="serif" style={{ textAlign: "center", marginTop: 18, color: "var(--gold-soft)", fontStyle: "italic" }}>
            Tap the photo for a surprise 🎉
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* layout-only helpers: no new colours, everything uses your existing CSS variables */
const CSS = `
.cp2-slot{ position:relative; isolation:isolate; height:100%; }
.cp2-ghost{ position:absolute; inset:0; z-index:-1; pointer-events:none; }
.cp2-clip{ position:absolute; inset:0; overflow:hidden; border-radius:inherit; pointer-events:none; }
.cp2-spot{ position:absolute; inset:0; }
.cp2-shine{ position:absolute; top:-10%; bottom:-10%; left:0; width:38%;
  background:linear-gradient(105deg, transparent, color-mix(in srgb, var(--ivory) 26%, transparent), transparent);
  transform:skewX(-12deg); }
.cp2-emblem{ position:relative; display:inline-block; }
.cp2-pulse{ position:absolute; left:50%; top:50%; width:54px; height:54px; margin:-27px 0 0 -27px;
  border-radius:50%; border:1px solid var(--gold); pointer-events:none; }
.cp2-ripple{ position:absolute; left:50%; top:50%; width:90px; height:90px; margin:-45px 0 0 -45px;
  border-radius:50%; border:1px solid var(--gold); pointer-events:none; opacity:0; }
`;