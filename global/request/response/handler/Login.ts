import { ResponseHandler } from "./Handler";
import { LoginResponse } from "@global/type/request/response/handler/Login";
import { ResponseHandlerProps } from "@global/type/request/response/handler/ResponseHandlerProps";

export class Login extends ResponseHandler {
  constructor({
    successMessage = "Login realizado com sucesso!",
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<LoginResponse> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
