import { DefaultApi2 as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi2";
import { ResponseHandler } from "../Handler";
import { LoginResponse } from "@global/type/request/Login";
import { ApiResponseHandlerProps } from "@global/type/request/ApiResponseHandlerProps";

export class Login extends ResponseHandler {
  constructor({
    successMessage = "Login realizado com sucesso!",
    onSuccessCallback,
    onSuccessActions,
  }: ApiResponseHandlerProps<LoginResponse> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
