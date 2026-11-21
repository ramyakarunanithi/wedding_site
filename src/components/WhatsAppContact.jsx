import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "../config.js";

export default function WhatsAppContact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    WHATSAPP_CONFIG.message
  )}`;

  return (
    <>
      {/* Dedicated Section in the page */}
      <section id="contact-whatsapp" style={{ position: "relative" }}>
        <div className="wrap">
          <p className="eyebrow">Full-Stack Web Development & Custom Tech</p>
          <h2 className="title">
            Need a Website <span className="gold-text">Built for You?</span> 💻✨
          </h2>
          <p
            className="serif"
            style={{
              textAlign: "center",
              color: "var(--ivory-dim)",
              fontSize: "1.2rem",
              maxWidth: 720,
              margin: "0 auto 20px",
            }}
          >
            {WHATSAPP_CONFIG.subtitle}
          </p>
          <div className="divider" />

          <motion.div
            className="glass whatsapp-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="wa-icon-glow">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.49 0-2.94-.4-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
              </svg>
            </div>

            <h3 style={{ fontSize: "1.8rem", margin: "14px 0 8px" }}>
              Get Any Custom Website with Full Backend Process
            </h3>
            <p
              style={{
                color: "var(--ivory-dim)",
                maxWidth: 580,
                margin: "0 auto 22px",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              Have a shop, business, startup, or upcoming event? We create all types of dynamic websites with complete backend processes — from e-commerce shops and birthday surprise portals to luxury wedding sites and full-scale business applications!
            </p>

            <div className="wa-features">
              <span>✔ E-Commerce & Online Shops</span>
              <span>✔ Birthday & Surprise Apps</span>
              <span>✔ Animated Wedding Invitations</span>
              <span>✔ Full Backend & Database Systems</span>
              <span>✔ Billing, Invoicing & Portals</span>
              <span>✔ Custom Themes & Live Interactivity</span>
            </div>

            <div style={{ marginTop: 28 }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn wa-btn"
              >
                <span>💬 Chat on WhatsApp</span>
                <span className="wa-arrow">→</span>
              </a>
            </div>

            <p style={{ marginTop: 14, fontSize: "0.8rem", color: "var(--gold-soft)", letterSpacing: "0.05em" }}>
              Quick response · Custom backend workflows · 100% Mobile responsive
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Quick Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-floating-btn"
        title="Order a Wedding Website on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="wa-floating-ping" />
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.49 0-2.94-.4-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
        </svg>
        <span className="wa-tooltip">Order Website 💬</span>
      </motion.a>
    </>
  );
}
