import CookieInterface from "./CookieInterface";

export default class Cookie implements CookieInterface {
  // Properties

  // Constructor
  constructor() {}

  // Methods
  hasCookie(name: string): boolean {
    const cookie = this.getCookie(name);
    return cookie !== null;
  }

  getCookie(name: string): string | null {
    const regex = new RegExp(`${name}=([^;]*)`);
    const match = document.cookie.match(regex);
    return match && match[1] ? match[1] : null;
  }

  getCookieContains(value: string): string | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      if (cookie.includes(value)) {
        const [, cookieValue] = cookie.split("="); // Divide o cookie em nome e valor
        return cookieValue; // Retorna apenas o valor
      }
    }
    return null;
  }

  setCookie(name: string, value: string, expirationDate: Date): void {
    var expires = "";
    if (expirationDate) {
      var date = new Date(expirationDate);
      // date.setTime(date.getTime() + expirationDate.getTime());
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  removeCookie(name: string): void {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}
