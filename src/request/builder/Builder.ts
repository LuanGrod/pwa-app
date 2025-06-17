import { Methods } from "@/type/Methods";
import { ResponseHandlerInterface } from "@request/response/handler/HandlerInterface";

type BuilderProps = {
  endpoint: string;
  method: Methods;
  headers: Record<string, string>;
  data: any;
  responseHandler: ResponseHandlerInterface;
};

export class RequestBuilder {
  protected endpoint: string;
  protected method: Methods;
  protected headers: Record<string, string>;
  protected data: any;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ endpoint, method = "GET", headers = {}, data = {}, responseHandler }: BuilderProps) {
    this.endpoint = endpoint;
    this.method = method;
    this.headers = headers;
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

  async build(): Promise<any> {
    try {
      const response = await fetch(this.endpoint, {
        method: this.method,
        headers: this.headers,
        body: this.data ? JSON.stringify(this.data) : null,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`, { cause: data });
      }

      return this.responseHandler.onSuccess(data);
    } catch (error) {
      return this.responseHandler.onError(error as Error);
    }
  }
}
