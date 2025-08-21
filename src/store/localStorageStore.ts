import { StateStorage } from "zustand/middleware";

/**
 * Cria um storage customizado para LocalStorage com expiração automática
 * @param expirationHours Horas de expiração
 * @returns StateStorage
 */
export const createLocalStorageStore = (expirationHours: number = 24): StateStorage => {
  return {
    getItem: (name: string): string | null => {
      try {
        const item = localStorage.getItem(name);
        if (!item) return null;

        const { data, expiresAt } = JSON.parse(item);

        // Se expirou, remove automaticamente e retorna null
        if (Date.now() > expiresAt) {
          localStorage.removeItem(name);
          return null;
        }

        return data;
      } catch (error) {
        // Se houve erro no parse, remove o item corrompido
        localStorage.removeItem(name);
        return null;
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        const expiresAt = Date.now() + expirationHours * 60 * 60 * 1000;
        const item = {
          data: value,
          expiresAt,
        };
        localStorage.setItem(name, JSON.stringify(item));
      } catch (error) {
        console.error("Erro ao salvar dados do storage:", error);
      }
    },
    removeItem: (name: string): void => {
      localStorage.removeItem(name);
    },
  };
};
