import { Login as LoginRequestBuilder } from "../Login";
import { Login as ResponseHandler } from "@global/request/response/handler/api/Login";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type LoginProps = {
  entity?: string | null;
  body: any;
  headers?: HeaderHandlerCollection | null;
  data?: Map<string, any>;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Login extends LoginRequestBuilder {
  constructor({ entity, body, headers = null, data, responseHandler = null }: LoginProps) {
    responseHandler = responseHandler || new ResponseHandler({ data });

    super({ entity, body, headers, responseHandler });
  }
}
