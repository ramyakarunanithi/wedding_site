import { useEffect, useRef } from "react";
import gsap from "gsap";
import { STORY } from "../config.js";

export default function Story() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".t-item").forEach((el) => {
        gsap.from(el, {
          opacity: 0, x: -50, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root}>
      <div className="wrap">
        <p className="eyebrow">Our Journey</p>
        <h2 className="title">A Story Written in Care</h2>
        <div className="divider" />
        <div className="timeline">
          {STORY.map((s) => (
            <div className="t-item" key={s.title}>
              <small>{s.year}</small>
              <h3 className="gold-text">{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
