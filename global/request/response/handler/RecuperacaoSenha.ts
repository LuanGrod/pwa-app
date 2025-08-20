import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { RecuperacaoSenhaResponse } from "@global/type/request/RecuperacaoSenha";

type RecuperacaoSenhaProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: RecuperacaoSenhaResponse) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class RecuperacaoSenha extends ResponseHandler {
  protected successMessage: string;

  constructor({
    successMessage = "Email de recuperação enviado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: RecuperacaoSenhaProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(result: RecuperacaoSenhaResponse): Promise<any> {
    this.successSetup(result);

    return {
      success: true,
      data: result,
    };
  }
}
