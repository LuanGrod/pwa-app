"use client";

import { useEffect } from "react";

type Props = {};

export default function AppHeightWrapper({}: Props) {
  useEffect(() => {
    const setAppHeight = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${height}px`);
    };

    setAppHeight();
    window.addEventListener("resize", setAppHeight);

    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  return null;
}
