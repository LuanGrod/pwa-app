import Cookie from "@/cookie/Cookie";
import type { HeaderHandlerInterface } from "./HandlerInterface";

export default class Authorization implements HeaderHandlerInterface {
  // Properties

  // Constructor
  constructor() {}

  // Methods
  handle(headers: HeadersInit, tokenName: string = "token"): HeadersInit {
    const cookiesHandler = new Cookie();
    const token = cookiesHandler.getCookie(tokenName);

    // If headers is a Headers object, use set; otherwise, mutate the object
    if (headers instanceof Headers) {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    } else {
      return {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
}
