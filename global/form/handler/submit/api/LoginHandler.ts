import { Login } from "@global/request/builder/api/Login";
import { Login as ResponseHandler } from "@global/request/response/handler/api/Login";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { LoginHandler as FormHandler } from "../LoginHandler";

type LoginHandlerProps = {
  entity?: string | null;
  props?: Map<string, any>;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class LoginHandler extends FormHandler {
  constructor({ entity, props, needsAuthorization, responseHandler = null }: LoginHandlerProps) {
    responseHandler = responseHandler || new ResponseHandler({ props });
    super({ entity, props, needsAuthorization, responseHandler });
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const loginRequestBuilder = new Login({
      entity: this.entity,
      data: values,
      props: this.props,
      responseHandler: this.responseHandler,
    });
    return await loginRequestBuilder.build();
  }
}
