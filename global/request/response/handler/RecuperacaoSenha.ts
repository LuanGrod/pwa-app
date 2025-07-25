import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { RecuperacaoSenhaResponse } from "@global/type/request/RecuperacaoSenha";

type RecuperacaoSenhaProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: RecuperacaoSenhaResponse) => Promise<void> | void;
};

export class RecuperacaoSenha extends ResponseHandler {
  protected successMessage: string;
  protected onSuccessCallback?: (result: RecuperacaoSenhaResponse) => Promise<void> | void;

  constructor({
    successMessage = "Email de recuperação enviado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: RecuperacaoSenhaProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
    this.successMessage = successMessage;
    this.onSuccessCallback = onSuccessCallback;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  /**
   * Handles a successful response. Executes the optional callback if provided.
   */
  protected async handleSuccess(result: RecuperacaoSenhaResponse): Promise<any> {
    this.successSetup(result);

    return {
      success: true,
      data: result,
    };
  }
}
