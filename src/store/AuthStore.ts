import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id: string;
  token: string;
  avatarUrl?: string;
  name?: string;
  planType?: string;
};

let storeInstance: ReturnType<typeof createAuthStore> | null = null;

export type AuthState = {
  user: User;
  _hasHydrated: boolean; // Novo campo para verificar se o estado foi hidratado
};

export type AuthActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

export type AuthStore = AuthState & AuthActions;

const storage = {
  getItem: async (name: string): Promise<string | null> => {
    if (typeof window === "undefined") return null;
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    return value ? decodeURIComponent(value) : null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=2592000`; // 30 dias
  },
  removeItem: async (name: string): Promise<void> => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
};

export const createAuthStore = (initState: AuthState) => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initState,
        _hasHydrated: false, // Novo campo
        setUser: (user) => set({ user }),
        clearUser: () => set({ 
          user: { id: "", token: "", avatarUrl: "", name: "", planType: "" },
          _hasHydrated: true // Mantém como true após clear
        }),
      }),
      {
        name: "auth-store",
        storage: createJSONStorage(() => storage),
        onRehydrateStorage: () => (state) => {
          state!._hasHydrated = true;
        },
      }
    )
  );
};


export const getAuthStore = () => {
  if (!storeInstance) {
    storeInstance = createAuthStore({
      user: { id: "", token: "", avatarUrl: "", name: "", planType: "" },
      _hasHydrated: false, // Inicializa como false
    });
  }
  return storeInstance;
};

export const authStore = {
  setUser: (user: User) => getAuthStore().getState().setUser(user),
  clearUser: () => getAuthStore().getState().clearUser(),
  getState: () => getAuthStore().getState(),
};
