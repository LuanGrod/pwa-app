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
    headers["Authorization"] = `Bearer ${token}`;
    return headers;
  }
}
