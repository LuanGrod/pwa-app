import { Login as LoginRequestBuilder } from "../Login";
import { Login as ResponseHandler } from "@global/request/response/handler/api/Login";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type LoginProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
  props?: Map<string, any>;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Login extends LoginRequestBuilder {
  constructor({ entity, data, headers = {}, props, responseHandler = null }: LoginProps) {
    responseHandler = responseHandler || new ResponseHandler({ props });

    super({ entity, data, headers, props, responseHandler });
  }
}
