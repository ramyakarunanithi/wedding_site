import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { COUPLE, BLESSINGS } from "../config.js";
import { celebrate } from "./Sparkles.jsx";

// Mask for the name reveal. The extra padding gives the script font room for its
// swashes and descenders (G, j, g, M), and the negative margin cancels it out so the
// layout does not move.
const MASK = {
  display: "inline-block",
  overflow: "hidden",
  padding: "0.3em 0.5em 0.5em",
  margin: "-0.3em -0.5em -0.5em",
};

// The gold colour is painted with background-clip: text, so it only shows inside the
// h1's own box. Letters that stick out of that box (swashes, descenders) turn invisible
// and look cut. Extra padding on the h1 gives the gradient room, and the negative margin
// keeps the layout where it was.
const H1_ROOM = {
  padding: "0.3em 0.5em 0.5em",
  margin: "0 -0.5em 0",
};

// Same feel as gsap "power3.out"
const EASE = [0.33, 1, 0.68, 1];

// Start times. Letters of each name are staggered, so the later items wait for them.
const T = {
  blessing: 0,
  sub: 0.6,
  groom: 1.0,     // Gokulraj letters start
  amp: 1.85,
  bride: 2.05,    // Megala letters start
  date: 2.9,
  btn: 3.4,
};

// One reusable variant: hidden -> show, with the delay passed in through `custom`
const make = (hiddenState, duration) => ({
  hidden: hiddenState,
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration, delay, ease: EASE },
  }),
});

const fadeDown = make({ opacity: 0, y: -20 }, 1);      // .blessing
const fadeUp20 = make({ opacity: 0, y: 20 }, 0.8);     // .hero-sub
const fadeUp24 = make({ opacity: 0, y: 24 }, 0.9);     // .hero-date
const fadeUpBtn = make({ opacity: 0, y: 20 }, 0.7);    // .btn

// One letter: comes up from below, blurred and slightly tilted, then settles clear
const letterReveal = {
  hidden: { y: "80%", opacity: 0, rotate: 8, filter: "blur(6px)" },
  show: (delay = 0) => ({
    y: "0%",
    opacity: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

const ampPop = {                                       // .amp (scale + rotate, overshoot)
  hidden: { scale: 0, rotate: -90 },
  show: (delay = 0) => ({
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 170, damping: 11, delay },
  }),
};

// Splits a name into letters and animates them one by one
function AnimatedName({ text, start, initial, animate }) {
  const STEP = 0.09; // gap between letters (smaller = faster)
  return (
    <span className="hero-name" style={{ display: "inline-block" }} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={letterReveal}
          custom={start + i * STEP}
          initial={initial}
          animate={animate}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const reduce = useReducedMotion();

  // Parallax: progress runs 0 -> 1 while the hero scrolls out of view
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const innerY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const innerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const state = ready ? "show" : "hidden";
  // Users who prefer reduced motion see the final layout straight away
  const initial = reduce ? "show" : "hidden";

  return (
    <section className="hero" ref={root}>
      <motion.div className="hero-bg" style={reduce ? undefined : { y: bgY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          src="/megala_video.mp4"
        />
        <div className="hero-video-overlay" />
      </motion.div>

      <motion.div
        className="hero-inner"
        style={{
          position: "relative",
          zIndex: 2,
          ...(reduce ? {} : { y: innerY, opacity: innerOpacity }),
        }}
      >
        <motion.p
          className="blessing"
          variants={fadeDown}
          custom={T.blessing}
          initial={initial}
          animate={state}
        >
          {BLESSINGS.map((b) => (
            <span key={b} style={{ display: "block" }}>{b}</span>
          ))}
        </motion.p>

        <motion.p
          className="hero-sub serif"
          style={{ fontSize: "1.6rem", letterSpacing: "0.12em", margin: "56px 0 34px" }}
          variants={fadeUp20}
          custom={T.sub}
          initial={initial}
          animate={state}
        >
          Together with our families, we invite you to the wedding of
        </motion.p>

        <h1 className="script gold-text" style={H1_ROOM}>
          <span style={MASK}>
            <AnimatedName text={COUPLE.groom.short} start={T.groom} initial={initial} animate={state} />
          </span>

          <motion.span
            className="amp"
            style={{ display: "inline-block" }}
            variants={ampPop}
            custom={T.amp}
            initial={initial}
            animate={state}
          >
            &
          </motion.span>

          <span style={MASK}>
            <AnimatedName text={COUPLE.bride.short} start={T.bride} initial={initial} animate={state} />
          </span>
        </h1>

        <motion.p
          className="hero-date serif"
          style={{ fontSize: "1.6rem", letterSpacing: "0.12em", margin: "30px 0 34px" }}
          variants={fadeUp24}
          custom={T.date}
          initial={initial}
          animate={state}
        >
22 November 2026 – Muhurtham, Kallakurichi<br/>
23 November 2026 – Reception, R.E Mahal, [Valathi]
        </motion.p>

        <motion.a
          className="btn"
          href="#events"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("events").scrollIntoView({ behavior: "smooth" });
          }}
          variants={fadeUpBtn}
          custom={T.btn}
          initial={initial}
          animate={state}
        >
          View Events
        </motion.a>

        <motion.button
          className="btn ghost"
          style={{ marginLeft: 12 }}
          onClick={celebrate}
          variants={fadeUpBtn}
          custom={T.btn}
          initial={initial}
          animate={state}
        >
          🎉 Celebrate
        </motion.button>
      </motion.div>

      <div className="scroll-hint">SCROLL<span /></div>
    </section>
  );
}