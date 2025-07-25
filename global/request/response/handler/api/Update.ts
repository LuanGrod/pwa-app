import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Update as UpdateResponseHandler } from "../Update";
import { UpdateResponse } from "@global/type/request/Update";

type UpdateProps<T> = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: UpdateResponse<T>) => Promise<void> | void;
};

export class Update<T = any> extends UpdateResponseHandler {
  constructor({
    successMessage = "Edição realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: UpdateProps<T>) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
  }
}
