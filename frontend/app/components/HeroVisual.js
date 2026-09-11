"use client";

import { useEffect, useRef, useState } from "react";

const MAX_TILT = 8;

const cards = [
  { z: 0, rotate: -3, x: 0, y: 0, opacity: 1 },
  { z: -36, rotate: 5, x: 22, y: 14, opacity: 0.85 },
  { z: -72, rotate: -8, x: -26, y: 26, opacity: 0.65 },
  { z: -108, rotate: 10, x: 32, y: 40, opacity: 0.45 },
  { z: -144, rotate: -11, x: -30, y: 54, opacity: 0.3 },
];

export default function HeroVisual() {
  const wrapperRef = useRef(null);
  const groupRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function evaluate() {
      setEnabled(pointerQuery.matches && !motionQuery.matches);
    }

    evaluate();
    pointerQuery.addEventListener("change", evaluate);
    motionQuery.addEventListener("change", evaluate);
    return () => {
      pointerQuery.removeEventListener("change", evaluate);
      motionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const wrapper = wrapperRef.current;
    const group = groupRef.current;
    if (!wrapper || !group) return;

    let running = false;

    function handlePointerMove(e) {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * MAX_TILT;
      const rotateY = (x - 0.5) * MAX_TILT;
      group.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handlePointerLeave() {
      group.style.transform = "rotateX(0deg) rotateY(0deg)";
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          running = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(wrapper);

    function handlePointerMoveGated(e) {
      if (running) handlePointerMove(e);
    }

    wrapper.addEventListener("pointermove", handlePointerMoveGated);
    wrapper.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      intersectionObserver.disconnect();
      wrapper.removeEventListener("pointermove", handlePointerMoveGated);
      wrapper.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="enter-scale hero-stack relative mx-auto aspect-[4/5] w-full max-w-90"
      style={{ "--stagger": "80ms" }}
    >
      <div className="hero-stack-drift-y h-full w-full">
        <div ref={groupRef} className="hero-stack-group h-full w-full">
          {cards.map((card, i) => (
            <div
              key={i}
              className="hero-stack-card absolute inset-x-[10%] inset-y-[6%] rounded-sm border border-line-strong bg-bg-panel p-5"
              style={{
                transform: `translateZ(${card.z}px) translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg)`,
                opacity: card.opacity,
                zIndex: cards.length - i,
              }}
            >
              <span className="block text-[0.625rem] tracking-[0.1em] text-ink-faint tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-4 flex flex-col gap-2.5">
                <span className="block h-1 w-3/4 rounded-full bg-line-strong" />
                <span className="block h-1 w-full rounded-full bg-line" />
                <span className="block h-1 w-5/6 rounded-full bg-line" />
                {i === 0 && <span className="mt-1 block h-1 w-1/2 rounded-full bg-accent" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
