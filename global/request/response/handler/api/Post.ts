import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Post as PostResponseHandler } from "../Post";

type PostProps<T = any> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: T) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Post<T = any> extends PostResponseHandler<T> {
  constructor({
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: PostProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
