import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS } from "../config.js";

// Event Timestamps (IST)
const MUHURTHAM_START = new Date("2026-11-22T08:30:00+05:30").getTime();
const MUHURTHAM_END = new Date("2026-11-22T10:00:00+05:30").getTime();
const RECEPTION_START = new Date("2026-11-23T18:00:00+05:30").getTime();
const RECEPTION_END = new Date("2026-11-23T21:00:00+05:30").getTime(); // 23 Nov, 9:00 PM

const calcDiff = (targetMs) => {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
    isFinished: diff <= 0,
  };
};

export default function Countdown() {
  // Determine initial event based on current time:
  // Once Muhurtham is over (>= 22 Nov 10:00 AM), automatically switch to Reception (until 23 Nov 9:00 PM)
  const getAutoEvent = () => {
    const now = Date.now();
    if (now >= MUHURTHAM_END && now <= RECEPTION_END) {
      return "reception";
    }
    return "wedding";
  };

  const [activeEvent, setActiveEvent] = useState(getAutoEvent);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0, isFinished: false });

  // Update countdown every second and auto-switch if Muhurtham passes
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();

      // Auto-switch to reception if currently on wedding and Muhurtham has ended
      if (now >= MUHURTHAM_END && now <= RECEPTION_END && activeEvent === "wedding") {
        setActiveEvent("reception");
      }

      let targetTime;
      if (activeEvent === "wedding") {
        targetTime = MUHURTHAM_START;
      } else {
        // Reception countdown: counts down to 6:00 PM start, or until 9:00 PM closing
        targetTime = now < RECEPTION_START ? RECEPTION_START : RECEPTION_END;
      }

      setTime(calcDiff(targetTime));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [activeEvent]);

  const items = [
    ["Days", time.d],
    ["Hours", time.h],
    ["Minutes", time.m],
    ["Seconds", time.s],
  ];

  const isReception = activeEvent === "reception";
  const now = Date.now();
  const isPostReception = now >= RECEPTION_END;

  return (
    <section style={{ paddingTop: 40, paddingBottom: 60, position: "relative" }}>
      <div className="wrap">
        {/* Event Selection Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
          <button
            type="button"
            className={`btn ${!isReception ? "" : "ghost"}`}
            onClick={() => setActiveEvent("wedding")}
            style={{ padding: "8px 20px", fontSize: "0.82rem" }}
          >
             Muhurtham (22 Nov)
          </button>
          <button
            type="button"
            className={`btn ${isReception ? "" : "ghost"}`}
            onClick={() => setActiveEvent("reception")}
            style={{ padding: "8px 20px", fontSize: "0.82rem" }}
          >
             Reception (23 Nov)
          </button>
        </div>

        {/* Dynamic Eyebrow & Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: "center", marginBottom: 28 }}
          >
            <p className="eyebrow" style={{ marginBottom: 8 }}>
              {!isReception
                ? "Counting down to the Muhurtham "
                : isPostReception
                ? "Celebrations Completed 🎉"
                : now < RECEPTION_START
                ? "Counting down to the Grand Reception ✨"
                : "Reception in progress · Until 9:00 PM 🎊"}
            </p>

            <h3
              className="gold-text"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
                margin: "4px 0",
              }}
            >
              {!isReception ? "Wedding Muhurtham" : "Grand Reception"}
            </h3>

            {/* <p className="serif" style={{ color: "var(--ivory-dim)", fontSize: "1.05rem" }}>
              {!isReception
                ? "Sunday, 22 November 2026 · 8:30 – 10:00 AM · Sri Govindaraja Perumal Temple"
                : "Monday, 23 November 2026 · 6:00 PM to 9:00 PM · R.E. Mahal (A/C)"}
            </p> */}
          </motion.div>
        </AnimatePresence>

        {/* The 4-Box Countdown Grid */}
        <div className="count-grid">
          {items.map(([label, val], i) => (
            <motion.div
              key={label}
              className="glass count-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <b className="gold-text">{String(val).padStart(2, "0")}</b>
              <small>{label}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
