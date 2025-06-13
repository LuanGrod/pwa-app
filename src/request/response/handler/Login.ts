import { Default as DefaultErrorHandlerCollection } from "@request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import CookieInterface from "@/cookie/CookieInterface";
import Cookie from "@cookie/Cookie";
import { LoginResponse } from "@/type/request/Login";

type LoginProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Login extends ResponseHandler {
  protected successMessage: string;
  protected cookie: CookieInterface;
  protected expirationDate: Date;

  constructor({ successMessage = "Login realizado com sucesso!", errorHandlerCollection = null }: LoginProps) {
    super({ errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection() });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
    this.cookie = new Cookie();
    this.expirationDate = new Date();
  }

  protected handleSuccess(result: LoginResponse): any {
    if (!result.userNotFound) {
      const { token, id } = result;
      this.expirationDate.setMonth(this.expirationDate.getMonth() + 1);
      this.cookie.setCookie("token", token, this.expirationDate);
      this.cookie.setCookie("id", id.toString(), this.expirationDate);
    }
    const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
    return (window.location.href = rootUrl!);
  }
}
