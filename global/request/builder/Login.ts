import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Login as ResponseHandler } from "@global/request/response/handler/Login";
import { DefaultApi2 } from "../error/handler/collection/DefaultApi2";

type LoginProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
  props?: Map<string, any>;
};

export class Login extends RequestBuilder {
  constructor({ entity, data, headers = {}, props }: LoginProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity ? `${apiUrl}/login/${entity}` : `${apiUrl}/login`;

    const method: Methods = "POST";

    const responseHandler = new ResponseHandler({
      errorHandlerCollection: new DefaultApi2(),
      props,
    });

    super({ endpoint, method, headers, data, responseHandler });
  }
}
