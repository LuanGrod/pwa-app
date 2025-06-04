import { ResponseHandlerInterface } from "@request/response/handler/HandlerInterface";

type BuilderProps = {
  endpoint: string;
  method: Methods;
  data: any;
  responseHandler: ResponseHandlerInterface;
};

export class RequestBuilder {
  protected endpoint: string;
  protected method: Methods;
  protected data: any;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ endpoint, method = "GET", data = {}, responseHandler }: BuilderProps) {
    this.endpoint = endpoint;
    this.method = method;
    this.data = data;
    this.responseHandler = responseHandler;
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  setMethod(method: Methods): void {
    this.method = method;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: this.data ? JSON.stringify(this.data) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();

      return this.responseHandler.onSuccess(result);
    } catch (error) {
      return this.responseHandler.onError(error as Error);
    }
  }
}
