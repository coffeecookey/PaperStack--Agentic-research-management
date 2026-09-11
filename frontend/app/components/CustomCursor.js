"use client";

import { useEffect, useRef, useState } from "react";

const RING_LERP = 0.15;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
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
    document.documentElement.classList.toggle("cursor-none", enabled);
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = null;
    let hasMoved = false;

    dot.style.opacity = "0";
    ring.style.opacity = "0";

    function handlePointerMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }

    function handlePointerOver(e) {
      if (e.target.closest("a, button")) ring.classList.add("cursor-ring--active");
    }

    function handlePointerOut(e) {
      if (e.target.closest("a, button")) ring.classList.remove("cursor-ring--active");
    }

    function tick() {
      ringX += (mouseX - ringX) * RING_LERP;
      ringY += (mouseY - ringY) * RING_LERP;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(tick);
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* pure white on both refs: mix-blend-mode:difference needs a fixed
          extreme color to invert reliably against both the cream and
          near-black theme backgrounds */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
