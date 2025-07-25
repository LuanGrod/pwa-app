import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import CookieInterface from "@global/cookie/CookieInterface";
import Cookie from "@global/cookie/Cookie";
import { GeracaoNovaSenhaResponse } from "@global/type/request/GeracaoNovaSenha";

type GeracaoNovaSenhaProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: GeracaoNovaSenhaResponse) => Promise<void> | void;
};

export class GeracaoNovaSenha extends ResponseHandler {
  protected successMessage: string;
  protected cookie: CookieInterface;
  protected expirationDate: Date;
    protected onSuccessCallback?: (result: GeracaoNovaSenhaResponse) => Promise<void> | void;

  constructor({
    successMessage = "Senha alterada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: GeracaoNovaSenhaProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
    this.successMessage = successMessage;
    this.onSuccessCallback = onSuccessCallback;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
    this.cookie = new Cookie();
    this.expirationDate = new Date();
  }

  /**
   * Handles a successful response. Executes the optional callback if provided.
   */
  protected async handleSuccess(result: GeracaoNovaSenhaResponse): Promise<any> {
    this.successSetup(result);
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
