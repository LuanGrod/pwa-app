import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Login as ResponseHandler } from "@global/request/response/handler/Login";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";

type LoginProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
  props?: Map<string, any>;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Login extends RequestBuilder {
  constructor({ entity, data, headers = {}, props, responseHandler = null }: LoginProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity ? `${apiUrl}/login/${entity}` : `${apiUrl}/login`;

    const method: Methods = "POST";

    responseHandler = responseHandler || new ResponseHandler({});

    super({ endpoint, method, headers, data, responseHandler });
  }
}
