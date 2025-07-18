import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Delete as DeleteResponseHandler } from "../Delete";

type DeleteProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Delete extends DeleteResponseHandler {
  constructor({
    successMessage = "Exclusão realizada com sucesso!",
    errorHandlerCollection = null,
  }: DeleteProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
  }
}
