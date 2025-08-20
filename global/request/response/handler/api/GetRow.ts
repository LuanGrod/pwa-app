import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { GetRow as GetRowResponseHandler } from "../GetRow";

type GetRowProps<T> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: T) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class GetRow<T = any> extends GetRowResponseHandler {
  constructor({
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: GetRowProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
