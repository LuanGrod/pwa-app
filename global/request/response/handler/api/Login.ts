import { DefaultApi2 as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi2";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Login as LoginResponseHandler } from "../Login";
import Cookie from "@global/cookie/Cookie";

type LoginProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  props?: Map<string, any>;
};

export class Login extends LoginResponseHandler {
  constructor({
    successMessage = "Login realizado com sucesso!",
    errorHandlerCollection = null,
    props,
  }: LoginProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      props,
    });
  }
}
