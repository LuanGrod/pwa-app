import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { GetRow as GetRowResponseHandler } from "../GetRow";

type GetRowProps<T> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: T) => Promise<void> | void;
};

export class GetRow<T = any> extends GetRowResponseHandler {
  constructor({ errorHandlerCollection = null, onSuccessCallback }: GetRowProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
  }
}
