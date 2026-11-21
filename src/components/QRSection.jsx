import { useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { SITE_URL } from "../config.js";

export default function QRSection() {
  const box = useRef(null);

  const download = () => {
    const canvas = box.current.querySelector("canvas");
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "gokulraj-megala-wedding-qr.png";
    a.click();
  };

  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">At the venue</p>
        <h2 className="title">Scan & Share Your Wishes</h2>
        <div className="divider" />
        <motion.div
          className="glass qr-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="serif" style={{ fontSize: "1.25rem", color: "var(--gold-soft)" }}>
            Scan with your phone camera to open this invitation, view the venue & leave your feedback.
          </p>
          <div className="qr-box" ref={box}>
            <QRCodeCanvas value={SITE_URL} size={220} level="H" fgColor="#0b2e22" bgColor="#ffffff" includeMargin={false} />
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn" onClick={download}>⬇ Download QR</button>
            <button className="btn ghost" onClick={() => window.print()}>🖨 Print</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
