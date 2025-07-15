import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import CookieInterface from "@global/cookie/CookieInterface";
import Cookie from "@global/cookie/Cookie";
import { LoginResponse } from "@global/type/request/Login";
import { startTransition } from "react";
import { HandlerInterface } from "@global/request/error/handler/HandlerInterface";
import { GetRow } from "@global/request/builder/GetRow";

type LoginProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  props?: Map<string, any>;
};

export class Login extends ResponseHandler {
  protected successMessage: string;
  protected cookie: CookieInterface;
  protected expirationDate: Date;
  protected props?: Map<string, any>;

  constructor({
    successMessage = "Login realizado com sucesso!",
    errorHandlerCollection = null,
    props,
  }: LoginProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
    this.cookie = new Cookie();
    this.expirationDate = new Date();
    this.props = props;
  }

  protected async handleSuccess(result: LoginResponse): Promise<any> {
    if (!result.userNotFound) {
      const { token, id } = result;
      this.expirationDate.setMonth(this.expirationDate.getMonth() + 1);
      this.cookie.setCookie("token", token, this.expirationDate);
      this.cookie.setCookie("id", id.toString(), this.expirationDate);

      const setEstudante = this.props?.get("setEstudante");

      const getRow = new GetRow({
        entity: "estudantes",
        id: id,
      });

      const response = await getRow.build(true);

      setEstudante({
        nomeCompleto: response.data.estudantes_nome_completo,
        urlImagem: response.data.estudantes_url_imagem,
        periodosPlanosId: response.data.periodos_planos_id,
      });
    }

    startTransition(() => {
      window.location.href = "/";
    });
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
