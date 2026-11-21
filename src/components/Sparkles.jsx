import { useEffect, useRef } from "react";

const COLORS = ["#ecd9a8", "#d4af6a", "#f8f1e3", "#e8a0a8", "#7fd1a8", "#ffffff"];

export default function Sparkles() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w, h, raf, last = 0;
    const parts = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spark = (x, y) =>
      parts.push({ t: "s", x, y, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2 + 0.4,
        life: 0, max: 40 + Math.random() * 20, size: 2 + Math.random() * 3, color: COLORS[(Math.random() * 3) | 0], rot: 0, vr: 0 });

    const burst = (x, y, n = 36) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 7;
        const kind = Math.random();
        parts.push({
          t: kind < 0.35 ? "h" : kind < 0.7 ? "c" : "s",
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4,
          life: 0, max: 80 + Math.random() * 60, size: 6 + Math.random() * 10,
          color: COLORS[(Math.random() * COLORS.length) | 0], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, g: 0.18,
        });
      }
    };

    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      spark(e.clientX, e.clientY);
    };
    const onDown = (e) => burst(e.clientX, e.clientY, 28);
    const onCelebrate = () => {
      for (let i = 0; i < 6; i++) setTimeout(() => burst(w * (0.15 + Math.random() * 0.7), h * (0.25 + Math.random() * 0.3), 50), i * 180);
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.x += p.vx; p.y += p.vy;
        if (p.g) { p.vy += p.g; p.vx *= 0.985; }
        p.rot += p.vr;
        const a = 1 - p.life / p.max;
        if (a <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        if (p.t === "h") {
          ctx.font = `${p.size * 1.6}px serif`;
          ctx.textAlign = "center";
          ctx.fillText("♥", p.x, p.y);
        } else if (p.t === "c") {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("celebrate", onCelebrate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("celebrate", onCelebrate);
    };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 80, pointerEvents: "none" }} />;
}

export const celebrate = () => window.dispatchEvent(new Event("celebrate"));
