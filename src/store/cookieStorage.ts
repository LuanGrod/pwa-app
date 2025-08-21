import Cookie from "@global/cookie/Cookie";
import { StateStorage } from "zustand/middleware";

/**
 * Cria um storage customizado para usar cookies com expiração nativa
 * @param expiresInDays Dias de expiração
 * @returns StateStorage
 */
export const createCookieStorage = (expiresInDays: number = 30): StateStorage => {
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
