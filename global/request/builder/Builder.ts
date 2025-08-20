import { Methods } from "@global/type/Methods";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import Authorization from "../header/handler/Authorization";
import { Default as DefaultHeaderCollection } from "../header/handler/collection/Default";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type BuilderProps = {
  endpoint: string;
  method: Methods;
  headers?: HeaderHandlerCollection | null;
  body: any;
  responseHandler: ResponseHandlerInterface;
};

export class RequestBuilder {
  protected endpoint: string;
  protected method: Methods;
  protected headers: HeaderHandlerCollection;
  protected body: any;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ endpoint, method = "GET", headers, body = {}, responseHandler }: BuilderProps) {
    this.endpoint = endpoint;
    this.method = method;
    this.headers = headers || new DefaultHeaderCollection();
    this.body = body;
    this.responseHandler = responseHandler;
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  setMethod(method: Methods): void {
    this.method = method;
  }

  /**
   * Sets the header handler collection to be used for this request.
   * @param headerCollection Header handler collection implementing CollectionInterface
   */
  setHeaders(headerCollection: HeaderHandlerCollection): void {
    this.headers = headerCollection;
  }

  setBody(body: any): void {
    this.body = body;
  }

  setResponseHandler(responseHandler: ResponseHandlerInterface): void {
    this.responseHandler = responseHandler;
  }

  /**
   * Builds and sends the request, applying all header handlers in the collection.
   * @param needsAuthorization Whether to apply the Authorization header handler.
   */
  async build(needsAuthorization?: boolean): Promise<any> {
    try {
      let finalHeaders: HeadersInit = {};
      // Apply all header handlers in the collection

      const handlers = this.headers.get();

      for (const handler of handlers) {
        finalHeaders = handler.handle(finalHeaders);
      }
      // Optionally apply Authorization
      if (needsAuthorization) {
        const authorization = new Authorization();
        finalHeaders = authorization.handle(finalHeaders);
      }

      const contentType =
        finalHeaders instanceof Headers
          ? finalHeaders.get("Content-Type")
          : typeof finalHeaders === "object" && finalHeaders !== null
          ? // @ts-ignore
            finalHeaders["Content-Type"]
          : undefined;

      const response = await fetch(this.endpoint, {
        method: this.method,
        headers: finalHeaders,
        body: this.body
          ? contentType === "application/json"
            ? JSON.stringify(this.body)
            : this.body
          : null,
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = [];
      }

      console.log(response)
      console.log(data)

      if (!response.ok || (data && data.success === false)) {
        throw new Error(`HTTP error ${response.status}`, { cause: data });
      }

      return this.responseHandler.onSuccess(data);
    } catch (error) {
      return this.responseHandler.onError(error as Error);
    }
  }
}
