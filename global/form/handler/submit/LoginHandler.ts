import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Login } from "@global/request/builder/Login";
import { Login as ResponseHandler } from "@global/request/response/handler/Login";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type LoginHandlerProps = {
  entity?: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface;
};

export class LoginHandler implements SubmitHandlerInterface {
  protected entity?: string;
  protected needsAuthorization: boolean;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ entity, needsAuthorization, responseHandler }: LoginHandlerProps) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
    this.responseHandler = responseHandler || new ResponseHandler({});
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const loginRequestBuilder = new Login({
      entity: this.entity,
      body: values,
      responseHandler: this.responseHandler,
    });
    return await loginRequestBuilder.build();
  }
}
