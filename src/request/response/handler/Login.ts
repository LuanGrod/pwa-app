import { Default as DefaultErrorHandlerCollection } from "@request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import CookieInterface from "@/cookie/CookieInterface";
import Cookie from "@cookie/Cookie";
import { LoginResponse } from "@/type/request/Login";
import { authStore } from "@/store/AuthStore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { startTransition } from "react";
import { HandlerInterface } from "@/request/error/handler/HandlerInterface";

type LoginProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  router: AppRouterInstance;
};

export class Login extends ResponseHandler {
  protected successMessage: string;
  protected cookie: CookieInterface;
  protected expirationDate: Date;
  protected router: AppRouterInstance;

  constructor({ successMessage = "Login realizado com sucesso!", errorHandlerCollection = null, router }: LoginProps) {
    super({ errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection() });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
    this.cookie = new Cookie();
    this.expirationDate = new Date();
    this.router = router;
  }

  protected async handleSuccess(result: LoginResponse): Promise<any> {
    if (!result.userNotFound) {
      const { token, id } = result;
      this.expirationDate.setMonth(this.expirationDate.getMonth() + 1);
      this.cookie.setCookie("token", token, this.expirationDate);
      this.cookie.setCookie("id", id.toString(), this.expirationDate);

      authStore.setUser({
        id: id.toString(),
        token,
        avatarUrl: "/project/assets/Foto.png",
        name: "Israel",
        planType: "1",
      });
    }

    startTransition(() => {
      this.router.push("/");
    });

    // window.location.href = "/";

    return result;
  }

  protected handleError(error: Error): any {
    let errorResponse = {};
    this.errorHandlerCollection?.get().forEach((errorHandler: HandlerInterface) => {
      let errorMessage = errorHandler.handle(error);
      if (errorMessage) {
        errorResponse = {
          success: false,
          messageType: "error",
          message: errorMessage,
        };
      }
    });

    return errorResponse;
  }
}
