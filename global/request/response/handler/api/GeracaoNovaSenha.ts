import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { GeracaoNovaSenha as GeracaoNovaSenhaResponseHandler } from "../GeracaoNovaSenha";

type GeracaoNovaSenhaProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class GeracaoNovaSenha extends GeracaoNovaSenhaResponseHandler {
  constructor({
    successMessage = "Senha alterada com sucesso!",
    errorHandlerCollection = null,
  }: GeracaoNovaSenhaProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
  }
}
