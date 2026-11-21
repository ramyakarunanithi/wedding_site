import { useMemo } from "react";

const HEART_COLORS = [
  "#d4af6a", // Royal gold
  "#f3e1a8", // Soft gold
  "#e8a0a8", // Rose gold
  "#ff9ebb", // Soft pink
  "#ffd79e", // Peach gold
  "#ffffff", // Shimmer white
];

export default function Petals() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 16,
        dur: 10 + Math.random() * 12,
        delay: -Math.random() * 20,
        drift: (Math.random() - 0.5) * 200,
        color: HEART_COLORS[i % HEART_COLORS.length],
        opacity: 0.45 + Math.random() * 0.4,
        rot: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="petals" aria-hidden="true">
      <style>{hearts
        .map(
          (h) => `
            @keyframes fallHeart${h.id} {
              0% {
                transform: translate(0, -20px) rotate(${h.rot}deg) scale(0.85);
                opacity: 0;
              }
              15% {
                opacity: ${h.opacity};
              }
              85% {
                opacity: ${h.opacity};
              }
              100% {
                transform: translate(${h.drift}px, 108vh) rotate(${h.rot + 360}deg) scale(1.1);
                opacity: 0;
              }
            }
          `
        )
        .join("")}</style>

      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-particle"
          style={{
            position: "absolute",
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            color: h.color,
            animation: `fallHeart${h.id} ${h.dur}s linear ${h.delay}s infinite`,
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              filter: `drop-shadow(0 2px 6px ${h.color}55)`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
