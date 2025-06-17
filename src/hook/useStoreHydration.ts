"use client";

import { useEffect, useState } from "react";
import { getAuthStore } from "@/store/AuthStore";

export const useStoreHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = getAuthStore().persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    
    // Verifica se já está hidratado
    if (getAuthStore().getState()._hasHydrated) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  return isHydrated;
};
