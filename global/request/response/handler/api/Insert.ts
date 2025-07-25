import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Insert as InsertResponseHandler } from "../Insert";
import { InsertResponse } from "@global/type/request/Insert";

type InsertProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: InsertResponse) => Promise<void> | void;
};

export class Insert extends InsertResponseHandler {
  constructor({
    successMessage = "Cadastro realizado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: InsertProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
  }
}
