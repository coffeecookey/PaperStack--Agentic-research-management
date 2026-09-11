"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    if (!pointerQuery.matches) return;

    const lenis = new Lenis({ lerp: 0.1 });

    let raf = null;
    function tick(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
