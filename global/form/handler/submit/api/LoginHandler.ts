import { Login } from "@global/request/builder/api/Login";
import { Login as ResponseHandler } from "@global/request/response/handler/api/Login";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { LoginHandler as FormHandler } from "../LoginHandler";

type LoginHandlerProps = {
  entity?: string | null;
  data?: Map<string, any>;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class LoginHandler extends FormHandler {
  constructor({ entity, data, needsAuthorization, responseHandler = null }: LoginHandlerProps) {
    responseHandler = responseHandler || new ResponseHandler({ data });
    super({ entity, data, needsAuthorization, responseHandler });
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
