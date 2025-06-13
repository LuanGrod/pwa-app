import { Default as DefaultErrorHandlerCollection } from "@request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { RecuperacaoSenhaResponse } from "@/type/request/RecuperacaoSenha";

type RecuperacaoSenhaProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class RecuperacaoSenha extends ResponseHandler {
  protected successMessage: string;

  constructor({
    successMessage = "Email de recuperação enviado com sucesso!",
    errorHandlerCollection = null,
  }: RecuperacaoSenhaProps) {
    super({ errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection() });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected handleSuccess(result: RecuperacaoSenhaResponse): any {
    return {
      success: true,
      data: result,
    };
  }
}
