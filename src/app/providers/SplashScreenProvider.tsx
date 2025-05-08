// components/SplashScreenWrapper.js
"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import SplashScreen from "../components/splashScreen/SplashScreen";

type Props = {
  children: React.ReactNode;
};

/**
 * 
 * @param param0 nao ta sendo usado mais
 * @returns 
 */
export default function SplashScreenWrapper({ children }: Props) {
  // 1) Começamos assumindo que a splash deve estar lá até provar o contrário
  const [showSplash, setShowSplash] = useState(true);

  useLayoutEffect(() => {
    const splashShown = sessionStorage.getItem("splash_shown");

    if (!splashShown) {
      // marca que já mostramos
      sessionStorage.setItem("splash_shown", "true");
      // depois de 3s tira a splash
      const timer = setTimeout(() => setShowSplash(false), 3000);
      return () => clearTimeout(timer);
    }

    // se já mostrou, não exibe splash
    setShowSplash(false);
  }, []);

  if (showSplash) {
    // enquanto deve estar na splash, só mostra ela
    return <SplashScreen />;
  }

  // depois: renderiza o seu app normalmente
  return <>{children}</>;
}
