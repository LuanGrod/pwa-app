import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createCookieStore } from "@global/store/cookieStore";

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

let cookieStorage = createCookieStore(30); 

export const useEstudante = create<EstudanteStore>()(
  persist(
    (set, get) => ({
      estudante: {
        urlImagem: "",
        nomeCompleto: "",
        periodosPlanosId: "",
      },
      setEstudante: (estudante: Estudante, expiresInDays = 30) => {
        cookieStorage = createCookieStore(expiresInDays);
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
        cookieStorage = createCookieStore(expiresInDays);
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
