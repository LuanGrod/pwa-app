export default interface HandlerInterface {
  // Properties

  // Methods
  hasCookie(name: string): boolean;
  getCookie(name: string): string | null;
  getCookieContains(name: string): string | null;
  setCookie(name: string, value: string, expirationDate: Date): void;
  removeCookie(name: string): void;
}
