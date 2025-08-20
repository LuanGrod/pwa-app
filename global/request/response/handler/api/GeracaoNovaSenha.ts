import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { GeracaoNovaSenha as GeracaoNovaSenhaResponseHandler } from "../GeracaoNovaSenha";
import { GeracaoNovaSenhaResponse } from "@global/type/request/GeracaoNovaSenha";

type GeracaoNovaSenhaProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: GeracaoNovaSenhaResponse) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class GeracaoNovaSenha extends GeracaoNovaSenhaResponseHandler {
  constructor({
    successMessage = "Senha alterada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: GeracaoNovaSenhaProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
