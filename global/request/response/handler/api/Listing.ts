import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Listing as ListingResponseHandler } from "../Listing";

type ListingProps = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Listing extends ListingResponseHandler {
  constructor({ errorHandlerCollection = null }: ListingProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
  }
}
