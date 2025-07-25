import type { HeaderHandlerInterface } from "./HandlerInterface";

/**
 * Handles the Content-Type header for requests.
 * @implements HeaderHandlerInterface
 */
export default class ContentType implements HeaderHandlerInterface {
  option: string;

  /**
   * @param option The Content-Type value to set (default: 'application/json')
   */
  constructor(option: string = "application/json") {
    this.option = option;
  }

  /**
   * Sets the Content-Type header.
   * @param headers Existing request headers
   * @returns Updated headers with Content-Type set
   */
  handle(headers: HeadersInit): HeadersInit {
    if (headers instanceof Headers) {
      headers.set("Content-Type", this.option);
      return headers;
    } else {
      return {
        ...headers,
        "Content-Type": this.option,
      };
    }
  }
}
