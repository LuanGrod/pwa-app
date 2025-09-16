import { Login } from "@global/request/builder/api/Login";
import { Login as ResponseHandler } from "@global/request/response/handler/api/Login";
import { LoginHandler as FormHandler } from "../LoginHandler";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class LoginHandler extends FormHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new Login(props);
  }
}
