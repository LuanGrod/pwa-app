import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Update as UpdateResponseHandler } from "../Update";
import { UpdateResponse } from "@global/type/request/Update";

type UpdateProps<T> = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: UpdateResponse<T>) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Update<T = any> extends UpdateResponseHandler {
  constructor({
    successMessage = "Edição realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions
  }: UpdateProps<T>) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions
    });
  }
}
