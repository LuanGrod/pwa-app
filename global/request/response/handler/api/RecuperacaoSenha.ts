import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { RecuperacaoSenha as RecuperacaoSenhaResponseHandler } from "../RecuperacaoSenha";
import { RecuperacaoSenhaResponse } from "@global/type/request/RecuperacaoSenha";

type RecuperacaoSenhaProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: RecuperacaoSenhaResponse) => Promise<void> | void;
};

export class RecuperacaoSenha extends RecuperacaoSenhaResponseHandler {
  constructor({
    successMessage = "Email de recuperação enviado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: RecuperacaoSenhaProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
  }
}
