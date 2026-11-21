import { motion } from "framer-motion";
import { celebrate } from "./Sparkles.jsx";

const LINES = [
  ["Tab. Blessings", "1 – 1 – 1", "morning · afternoon · night"],
  ["Syp. Laughter", "Unlimited", "no side effects"],
  ["Cap. Biriyani", "After food? Before food!", "extra serving allowed"],
  ["Inj. Dance", "At reception", "6:00 PM onwards"],
  ["Duration", "Forever", "no refills needed"],
];

export default function Prescription() {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">Doctor's orders</p>
        <h2 className="title">The Wedding Prescription ℞</h2>
        <div className="divider" />
        <motion.div
          className="rx"
          initial={{ opacity: 0, rotateX: 40, y: 60 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rx-head">
            <div>
              <b>Dr. S. Gokulraj & Dr. M.P. Megala</b>
              <small>Wedding Clinic · Kallakurichi</small>
            </div>
            <span className="rx-sym">℞</span>
          </div>
          <p className="rx-pt">Patient: <b>You (and your whole family)</b> &nbsp;·&nbsp; Date: 22 & 23 Nov 2026</p>
          {LINES.map(([a, b, c], i) => (
            <motion.div
              className="rx-line"
              key={a}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.25, duration: 0.6 }}
            >
              <span>{a}</span><span>{b}</span><em>{c}</em>
            </motion.div>
          ))}
          <div className="rx-foot">
            <span className="script" style={{ fontSize: "2rem" }}>Dr. G & Dr. M</span>
            <motion.button
              className="stamp"
              onClick={celebrate}
              whileHover={{ scale: 1.1, rotate: -8 }}
              whileTap={{ scale: 0.85 }}
            >
              APPROVED<br />✔ tap me
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
