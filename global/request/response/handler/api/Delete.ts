import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Delete as DeleteResponseHandler } from "../Delete";
import { DeleteResponse } from "@global/type/request/Delete";

type DeleteProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: DeleteResponse) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Delete extends DeleteResponseHandler {
  constructor({
    successMessage = "Exclusão realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: DeleteProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
