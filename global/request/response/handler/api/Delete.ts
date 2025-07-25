import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Delete as DeleteResponseHandler } from "../Delete";
import { DeleteResponse } from "@global/type/request/Delete";

type DeleteProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: DeleteResponse) => Promise<void> | void;
};

export class Delete extends DeleteResponseHandler {
  constructor({
    successMessage = "Exclusão realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: DeleteProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
  }
}
