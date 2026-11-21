import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Petals from "./components/Petals.jsx";
import Hero from "./components/Hero.jsx";
import Countdown from "./components/Countdown.jsx";
import Couple from "./components/Couple.jsx";
import Events from "./components/Events.jsx";
import Story from "./components/Story.jsx";
import Feedback from "./components/Feedback.jsx";
import QRSection from "./components/QRSection.jsx";
import Sparkles from "./components/Sparkles.jsx";
import Ecg from "./components/Ecg.jsx";
import Moments from "./components/Moments.jsx";
import Prescription from "./components/Prescription.jsx";
import Marquee from "./components/Marquee.jsx";
import Puzzle from "./components/Puzzle.jsx";
import ScratchCard from "./components/ScratchCard.jsx";
import WhatsAppContact from "./components/WhatsAppContact.jsx";
import Projects from "./components/Projects.jsx";
import { COUPLE } from "./config.js";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  // Lenis smooth scrolling synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.3, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.scrollTo(0, { immediate: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />

      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <div style={{ textAlign: "center", position: "relative", zIndex: 2, filter: "drop-shadow(0 6px 24px rgba(0, 0, 0, 0.85))" }}>
              <motion.div
                className="script gold-text"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 6.5rem)",
                  display: "inline-block",
                  padding: "0.2em 0.5em 0.25em",
                  lineHeight: 1.25,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {COUPLE.groom.short[0]} <span style={{ fontSize: "0.6em" }}>&</span> {COUPLE.bride.short[0]}
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{ height: 1, background: "var(--gold)", margin: "18px auto 0" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Petals />
      <Sparkles />
      <main>
        <Hero ready={!loading} />
        <Countdown />
        
        <Marquee />
        <Couple />
        <Ecg />
        <Moments />
        <Events />
        <Puzzle />
        <ScratchCard />
        <Prescription />
        <Story />
        <Feedback />
        {/* <QRSection /> */}
        <WhatsAppContact />
        <Projects />
        <Ecg />
      </main>

      <footer>
        <span className="script gold-text">Thank you</span>
        <p className="serif" style={{ fontSize: "1.2rem" }}>
          Your presence & blessings make our day complete.
        </p>
        <p style={{ marginTop: 14, fontSize: "0.75rem", letterSpacing: "0.2em" }}>
          GOKULRAJ & MEGALA · 2026
        </p>
      </footer>
    </>
  );
}
