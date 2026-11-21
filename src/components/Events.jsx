import { useRef } from "react";
import { motion } from "framer-motion";
import { EVENTS, HOSTS } from "../config.js";

function Tilt({ children, className }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const leave = () => (ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)");
  return (
    <div ref={ref} className={className} onMouseMove={move} onMouseLeave={leave} style={{ transition: "transform .25s ease-out" }}>
      {children}
    </div>
  );
}

export default function Events() {
  return (
    <section id="events">
      <div className="wrap">
        <p className="eyebrow">Save the dates</p>
        <h2 className="title">Wedding Events</h2>
        <div className="divider" />
        <div className="events">
          {EVENTS.map((e, i) => (
            <motion.div
              key={e.key}
              initial={{ opacity: 0, y: 70, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt className="glass event">
                <div className="tamil">{e.tamil}</div>
                <h3 className="gold-text">{e.title}</h3>
                <div className="date">{e.day}, {e.date}</div>
                <div className="meta">
                   {e.time}<br />
                  <strong style={{ color: "var(--ivory)", fontWeight: 500 }}>{e.venue}</strong><br />
                  {e.address}
                </div>
                <a className="btn" href={e.map} target="_blank" rel="noreferrer"> {e.title} Map</a>
              </Tilt>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="serif"
          style={{ textAlign: "center", marginTop: 56, fontSize: "1.25rem", color: "var(--ivory-dim)" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
        >
          Warmly invited by<br />
          {HOSTS.map((h) => (
            <strong key={h} className="gold-text" style={{ display: "block", fontSize: "1.4rem" }}>{h}</strong>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
