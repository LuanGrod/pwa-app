import { DefaultApi2 as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi2";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Login as LoginResponseHandler } from "../Login";
import { LoginResponse } from "@global/type/request/Login";

type LoginProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  data?: Map<string, any>;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: LoginResponse) => Promise<void> | void;
};

export class Login extends LoginResponseHandler {
  constructor({
    successMessage = "Login realizado com sucesso!",
    errorHandlerCollection = null,
    data,
    onSuccessCallback,
  }: LoginProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      data,
      onSuccessCallback,
    });
  }
}
