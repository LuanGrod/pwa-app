import { BaseSubmitHandler } from "./BaseSubmitHandler";
import { Login } from "@global/request/builder/Login";
import { Login as ResponseHandler } from "@global/request/response/handler/Login";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class LoginHandler extends BaseSubmitHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new Login(props);
  }
}
