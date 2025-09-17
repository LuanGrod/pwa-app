import { Methods } from "@global/type/Methods";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import Authorization from "../header/handler/Authorization";
import { Default as DefaultHeaderCollection } from "../header/handler/collection/Default";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

export abstract class RequestBuilder {
  protected endpoint: string;
  protected method: Methods;
  protected headers: HeaderHandlerCollection;
  protected body: any;
  protected responseHandler: ResponseHandlerInterface;

  constructor(props: any) {
    const config = this.configure(props);
    this.endpoint = config.endpoint;
    this.method = config.method;
    this.headers = config.headers;
    this.body = config.body;
    this.responseHandler = config.responseHandler;
  }

  protected abstract getApiPath(): string;

  protected abstract getMethod(): Methods;

  protected configure(props: any) {
    const { entity, headers, responseHandler, body, id, parentEntity, parentId } = props;

    return {
      endpoint: this.buildEndpoint(entity, id, parentEntity, parentId),
      method: this.getMethod(),
      headers: headers || new DefaultHeaderCollection(),
      body: body || null,
      responseHandler,
    };
  }

  protected buildEndpoint(
    entity?: string,
    id?: string,
    parentEntity?: string,
    parentId?: number
  ): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const path = this.getApiPath();

    if (parentEntity && parentId) {
      const basePath = path ? `${apiUrl}/${path}` : apiUrl;
      return entity 
        ? `${basePath}/${parentEntity}/${parentId}/${entity}${id ? `/${id}` : ""}`
        : `${basePath}/${parentEntity}/${parentId}${id ? `/${id}` : ""}`;
    }

    if (entity) {
      const basePath = path ? `${apiUrl}/${path}/${entity}` : `${apiUrl}/${entity}`;
      return id ? `${basePath}/${id}` : basePath;
    }

    // Para casos sem entity (como login, auth, etc)
    const basePath = path ? `${apiUrl}/${path}` : apiUrl;
    return id ? `${basePath}/${id}` : basePath;
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  setMethod(method: Methods): void {
    this.method = method;
  }

  setHeaders(headerCollection: HeaderHandlerCollection): void {
    this.headers = headerCollection;
  }

  setBody(body: any): void {
    this.body = body;
  }

  setResponseHandler(responseHandler: ResponseHandlerInterface): void {
    this.responseHandler = responseHandler;
  }

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

      if (!response.ok || (data && data.success === false)) {
        throw new Error(`HTTP error ${response.status}`, { cause: data });
      }

      return this.responseHandler.onSuccess(data);
    } catch (error) {
      return this.responseHandler.onError(error as Error);
    }
  }
}
