import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Login } from "@global/request/builder/Login";
import { Login as ResponseHandler } from "@global/request/response/handler/Login";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type LoginHandlerProps = {
  entity?: string | null;
  data?: Map<string, any>;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class LoginHandler implements SubmitHandlerInterface {
  protected entity?: string | null;
  protected data?: Map<string, any>;
  protected needsAuthorization: boolean;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ entity, data, needsAuthorization, responseHandler = null }: LoginHandlerProps) {
    this.entity = entity;
    this.data = data;
    this.needsAuthorization = needsAuthorization || false;
    this.responseHandler = responseHandler || new ResponseHandler({});
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const loginRequestBuilder = new Login({
      entity: this.entity,
      body: values,
      data: this.data,
      responseHandler: this.responseHandler,
    });
    return await loginRequestBuilder.build();
  }
}
