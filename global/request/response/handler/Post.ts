import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type PostProps<T = any> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: T) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Post<T = any> extends ResponseHandler {
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
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(data: T): Promise<any> {
    this.successSetup(data);

    return data;
  }
}
