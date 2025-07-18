import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { GetRow as GetRowResponseHandler } from "../GetRow";

type GetRowProps = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class GetRow extends GetRowResponseHandler {
  constructor({ errorHandlerCollection = null }: GetRowProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
  }
}
