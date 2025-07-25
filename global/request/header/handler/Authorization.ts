import Cookie from "@global/cookie/Cookie";
import type { HeaderHandlerInterface } from "./HandlerInterface";

export default class Authorization implements HeaderHandlerInterface {
  option: string;

  /**
   * @param option The cookie name for the token (default: 'token')
   */
  constructor(option: string = "token") {
    this.option = option;
  }

  /**
   * Adds the Authorization header using a token from cookies.
   * @param headers Request headers
   * @returns Updated headers with Authorization set
   */
  handle(headers: HeadersInit): HeadersInit {
    const cookiesHandler = new Cookie();
    const token = cookiesHandler.getCookie(this.option);

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
