// components/SplashScreenWrapper.js
"use client";

import { useEffect, useState } from "react";
import SplashScreen from "../components/splashScreen/SplashScreen";

type Props = {
  children: React.ReactNode;
};

export default function SplashScreenWrapper({ children }: Props) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Verifica se já foi exibido usando sessionStorage
    const splashShown = ""
    // const splashShown = sessionStorage.getItem("splash_shown");

    if (!splashShown) {
      setShowSplash(true);
      sessionStorage.setItem("splash_shown", "true");

      // Tempo total do splash + animação
      setTimeout(() => setShowSplash(false), 3000);
    }
  }, []);

  return (
    <>
      {showSplash && (
        <SplashScreen/>
      )}

      <div style={{ visibility: showSplash ? "hidden" : "visible" }}>{children}</div>
    </>
  );
}
