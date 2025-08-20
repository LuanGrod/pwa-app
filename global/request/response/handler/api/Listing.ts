import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Listing as ListingResponseHandler } from "../Listing";

type ListingProps<T> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: Listagem<T>) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Listing<T = any> extends ListingResponseHandler {
  constructor({
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: ListingProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
