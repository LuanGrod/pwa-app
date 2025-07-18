import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Insert as InsertResponseHandler } from "../Insert";

type InsertProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Insert extends InsertResponseHandler {
  constructor({
    successMessage = "Cadastro realizado com sucesso!",
    errorHandlerCollection = null,
  }: InsertProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
  }
}
