import { useEffect, useRef } from "react";
import gsap from "gsap";

// Doctor-themed ECG heartbeat line that draws itself as you scroll and ends in a heart.
export default function Ecg() {
  const wrap = useRef(null);
  const path = useRef(null);
  const heart = useRef(null);

  useEffect(() => {
    const len = path.current.getTotalLength();
    gsap.set(path.current, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(heart.current, { scale: 0, transformOrigin: "50% 50%" });
    const ctx = gsap.context(() => {
      gsap.to(path.current, {
        strokeDashoffset: 0, ease: "none",
        scrollTrigger: { trigger: wrap.current, start: "top 85%", end: "bottom 45%", scrub: 0.6 },
      });
      gsap.to(heart.current, {
        scale: 1, ease: "back.out(3)",
        scrollTrigger: { trigger: wrap.current, start: "bottom 60%", end: "bottom 45%", scrub: true },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} style={{ padding: "30px 0", maxWidth: 1100, margin: "0 auto" }}>
      <svg viewBox="0 0 1000 120" width="100%" style={{ overflow: "visible" }} aria-hidden>
        <path
          ref={path}
          d="M0 60 H250 L280 60 L300 20 L325 100 L350 40 L370 60 H560 L580 60 L600 15 L628 105 L655 35 L675 60 H900"
          fill="none" stroke="#d4af6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 8px rgba(212,175,106,0.8))" }}
        />
        <g ref={heart} transform="translate(930 60)">
          <path
            d="M0 12 C-26 -8 -14 -28 0 -14 C14 -28 26 -8 0 12Z"
            fill="#e8a0a8" style={{ filter: "drop-shadow(0 0 10px rgba(232,160,168,0.9))", animation: "beat 1.1s infinite" }}
          />
        </g>
      </svg>
    </div>
  );
}
