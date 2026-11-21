import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FEEDBACK_ENDPOINT, SEED_REVIEWS } from "../config.js";

const KEY = "wedding-reviews-v1";

export default function Feedback() {
  const [reviews, setReviews] = useState(SEED_REVIEWS);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Load reviews from Google Sheets endpoint & sync with local storage
  const loadReviews = async () => {
    if (!FEEDBACK_ENDPOINT) {
      try {
        const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
        setReviews([...saved, ...SEED_REVIEWS]);
      } catch {}
      return;
    }

    try {
      const res = await fetch(FEEDBACK_ENDPOINT);
      const data = await res.json();
      if (Array.isArray(data)) {
        if (data.length > 0) {
          setReviews(data);
          try {
            localStorage.setItem(KEY, JSON.stringify(data));
          } catch {}
        } else {
          setReviews(SEED_REVIEWS);
        }
      }
    } catch (e) {
      // Offline fallback
      try {
        const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
        setReviews(saved.length > 0 ? saved : SEED_REVIEWS);
      } catch {}
    }
  };

  // Initial load + live refresh every 10 seconds if endpoint is set
  useEffect(() => {
    loadReviews();
    if (FEEDBACK_ENDPOINT) {
      const id = setInterval(loadReviews, 10000);
      return () => clearInterval(id);
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);
    const entry = {
      name: name.trim(),
      message: message.trim(),
      rating: Number(rating) || 5,
      time: new Date().toISOString(),
      ts: Date.now(),
    };

    // Show instantly (optimistic UI)
    const next = [entry, ...reviews.filter((r) => r.ts !== 1 && r.time !== entry.time)];
    setReviews(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}

    // Send to Google Sheets web app
    if (FEEDBACK_ENDPOINT) {
      try {
        await fetch(FEEDBACK_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight
          body: JSON.stringify(entry),
        });
        // Re-sync after 1.5 seconds to get final sheet state
        setTimeout(loadReviews, 1500);
      } catch (err) {
        console.error("Failed to send review to Google Sheets:", err);
      }
    }

    setName("");
    setMessage("");
    setRating(5);
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <section id="feedback-section">
      <div className="wrap">
        <p className="eyebrow">Wishes & Guest Blessings</p>
        <h2 className="title">Leave Your Blessings 💌</h2>
        <div className="divider" />

        {/* Live Rating Counter Bar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div className="stat-pill" style={{ padding: "8px 24px" }}>
            <span style={{ fontSize: "1.1rem" }}>⭐ {avg}</span>
            <span style={{ opacity: 0.7 }}>·</span>
            <span>{reviews.length} {reviews.length === 1 ? "Blessing" : "Blessings"} Received</span>
          </div>
        </div>

        <div className="fb-grid">
          {/* Wishes Submission Form */}
          <motion.form
            className="glass form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
            />

            <div className="stars" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  className={n <= rating ? "on" : ""}
                  onClick={() => setRating(n)}
                  aria-label={`${n} stars`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              rows={5}
              placeholder="Write your heartfelt wishes for Dr. Gokulraj & Dr. Megala…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              required
            />

            <button className="btn" type="submit" disabled={sending}>
              {sending ? "Sending Blessings... ⏳" : "Send Wishes 💌"}
            </button>

            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: "var(--gold-soft)", textAlign: "center", fontWeight: 500 }}
                >
                  Thank you! Your blessings are received 💚
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Live Reviews List */}
          <div className="reviews">
            <AnimatePresence initial={false}>
              {reviews.map((r, i) => {
                const ratingNum = Math.min(5, Math.max(1, Number(r.rating) || 5));
                return (
                  <motion.div
                    key={r.time || r.ts || r.name + i}
                    className="glass review"
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <b>{r.name}</b>
                      {r.time && (
                        <small style={{ color: "var(--gold-soft)", opacity: 0.65, fontSize: "0.72rem" }}>
                          {new Date(r.time).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </small>
                      )}
                    </div>
                    <div className="st">
                      {"★".repeat(ratingNum)}
                      {"☆".repeat(5 - ratingNum)}
                    </div>
                    <p>{r.message}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
