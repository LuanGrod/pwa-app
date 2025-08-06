import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import Cookie from "../../global/cookie/Cookie";

type Estudante = {
  urlImagem?: string;
  nomeCompleto?: string;
  periodosPlanosId?: string;
};

type EstudanteStore = {
  estudante: Estudante;
  setEstudante: (estudante: Estudante, expiresInDays?: number) => void;
  clearEstudante: () => void;
  updateUrlImagem: (urlImagem: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: any) => void;
  updateExpiration: (expiresInDays: number) => void;
};

// Storage customizado para usar cookies com expiração nativa
const createCookieStorage = (expiresInDays: number = 30): StateStorage => {
  const cookie = new Cookie();
  
  return {
    getItem: (name: string): string | null => {
      return cookie.getCookie(name);
    },
    setItem: (name: string, value: string): void => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expiresInDays);
      cookie.setCookie(name, value, expirationDate);
    },
    removeItem: (name: string): void => {
      cookie.removeCookie(name);
    },
  };
};

// Instância global do storage de cookies (pode ser reconfigurada)
let cookieStorage = createCookieStorage(30); // Padrão de 30 dias

export const useEstudante = create<EstudanteStore>()(
  persist(
    (set, get) => ({
      estudante: {
        urlImagem: "",
        nomeCompleto: "",
        periodosPlanosId: "",
      },
      setEstudante: (estudante: Estudante, expiresInDays = 30) => {
        // Recria o storage com nova expiração, se especificada
        cookieStorage = createCookieStorage(expiresInDays);
        set({ estudante });
      },
      clearEstudante: () => {
        set({
          estudante: {
            urlImagem: "",
            nomeCompleto: "",
            periodosPlanosId: "",
          },
        });
      },
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      updateUrlImagem: (urlImagem: string) => {
        const { estudante } = get();
        set({ estudante: { ...estudante, urlImagem } });
      },
      updateExpiration: (expiresInDays: number) => {
        // Recria o storage com nova expiração
        cookieStorage = createCookieStorage(expiresInDays);
        // Re-salva os dados com nova expiração
        const currentData = get();
        set({ estudante: currentData.estudante });
      },
    }),
    {
      name: "estudante-store",
      storage: createJSONStorage(() => cookieStorage),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
