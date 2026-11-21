import { motion } from "framer-motion";
import { PORTFOLIO_CONFIG } from "../config.js";

const cardAnim = (i = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
});

export default function Projects() {
  return (
    <section id="developer-projects" style={{ position: "relative" }}>
      <div className="wrap">
        <p className="eyebrow">Developer Portfolio & Works</p>
        <h2 className="title">
          Crafted by <span className="gold-text">{PORTFOLIO_CONFIG.developerName}</span> ✨
        </h2>
        <p
          className="serif"
          style={{
            textAlign: "center",
            color: "var(--ivory-dim)",
            fontSize: "1.2rem",
            maxWidth: 680,
            margin: "0 auto 10px",
          }}
        >
          {PORTFOLIO_CONFIG.subtitle}
        </p>
        <div className="divider" />

        {/* Projects Grid */}
        <div className="projects-grid">
          {PORTFOLIO_CONFIG.projects.map((proj, idx) => (
            <motion.div
              key={proj.id || idx}
              className="glass project-card"
              {...cardAnim(idx)}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="project-thumb-box">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="project-thumb-img"
                />
                <span className="project-category-badge">{proj.category}</span>
              </div>

              <div className="project-card-body">
                <h3 className="project-card-title">{proj.title}</h3>
                <p className="project-card-desc">{proj.desc}</p>

                <div className="project-tech-stack">
                  {proj.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-card-actions">
                  {proj.live && proj.live !== "#" && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn project-btn"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L24 22H0L12 1Z" />
                      </svg>
                      <span>Live on Vercel ↗</span>
                    </a>
                  )}
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn ghost project-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vercel & GitHub Showcase Banner */}
        <motion.div
          className="glass github-profile-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="gh-banner-content">
            <div className="gh-avatar-circle">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#d4af6a">
                <path d="M12 1L24 22H0L12 1Z" />
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "1.3rem", color: "var(--ivory)", margin: 0 }}>
                Explore All Live Deployments on Vercel
              </h4>
              <p style={{ color: "var(--gold-soft)", fontSize: "0.9rem", margin: "4px 0 0" }}>
                @{PORTFOLIO_CONFIG.githubUrl.split("/").pop()} · Frontend Developer & UI Creator
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            {PORTFOLIO_CONFIG.portfolioUrl && (
              <a
                href={PORTFOLIO_CONFIG.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ whiteSpace: "nowrap" }}
              >
                <span>🌟 Visit Portfolio Site ↗</span>
              </a>
            )}
            <a
              href={PORTFOLIO_CONFIG.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost"
              style={{ whiteSpace: "nowrap" }}
            >
              <span>▲ All Vercel Works ↗</span>
            </a>
            <a
              href={PORTFOLIO_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost"
              style={{ whiteSpace: "nowrap" }}
            >
              <span>GitHub Profile ↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
