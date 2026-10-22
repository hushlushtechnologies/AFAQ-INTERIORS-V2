"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    lenis?.stop();
    html.style.overflow = "hidden";

    return () => {
      lenis?.start();
      html.style.overflow = "";
    };
  }, [locked, lenis]);
}