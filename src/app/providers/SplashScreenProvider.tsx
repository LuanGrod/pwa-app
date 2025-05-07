// components/SplashScreenWrapper.js
"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SplashScreenWrapper({ children }: Props) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Verifica se já foi exibido usando sessionStorage
    const splashShown = sessionStorage.getItem("splash_shown");

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
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            background: "#e60014",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
      )}

      <div style={{ visibility: showSplash ? "hidden" : "visible" }}>{children}</div>
    </>
  );
}
