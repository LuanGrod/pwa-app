import { Methods } from "@/type/Methods";
import { ResponseHandlerInterface } from "@request/response/handler/HandlerInterface";
import Authorization from "../header/handler/Authorization";

type BuilderProps = {
  endpoint: string;
  method: Methods;
  headers: HeadersInit;
  data: any;
  responseHandler: ResponseHandlerInterface;
};

export class RequestBuilder {
  protected endpoint: string;
  protected method: Methods;
  protected headers: HeadersInit;
  protected data: any;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ endpoint, method = "GET", headers = {}, data = {}, responseHandler }: BuilderProps) {
    this.endpoint = endpoint;
    this.method = method;
    this.headers = { "Content-Type": "application/json", ...headers };
    this.data = data;
    this.responseHandler = responseHandler;
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  setMethod(method: Methods): void {
    this.method = method;
  }

  setHeaders(header: Record<string, string>): void {
    this.headers = header;
  }

  setData(data: any): void {
    this.data = data;
  }

  setResponseHandler(responseHandler: ResponseHandlerInterface): void {
    this.responseHandler = responseHandler;
  }

  async build(needsAuthorization?: boolean): Promise<any> {
    try {
      if (needsAuthorization) {
        const authorization = new Authorization();
        this.headers = authorization.handle(this.headers);
      }

      const response = await fetch(this.endpoint, {
        method: this.method,
        headers: this.headers,
        body: this.data ? JSON.stringify(this.data) : null,
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = [];
      }

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`, { cause: data });
      }

      return this.responseHandler.onSuccess(data);
    } catch (error) {
      return this.responseHandler.onError(error as Error);
    }
  }
}
