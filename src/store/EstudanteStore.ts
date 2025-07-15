import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Estudante = {
  urlImagem?: string;
  nomeCompleto?: string;
  periodosPlanosId?: string;
};

type EstudanteStore = {
  estudante: Estudante;
  setEstudante: (estudante: Estudante) => void;
  clearEstudante: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: any) => void;
};

export const useEstudante = create<EstudanteStore>()(
  persist(
    (set, get) => ({
      estudante: {
        urlImagem: "",
        nomeCompleto: "",
        periodosPlanosId: "",
      },
      setEstudante: (estudante: Estudante) => {
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
    }),
    {
      name: "estudante-store",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
