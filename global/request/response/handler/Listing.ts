import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type ListingProps<T> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: Listagem<T>) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Listing<T = any> extends ResponseHandler {
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
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess<T = any>(result: Listagem<T>): Promise<any> {
    this.successSetup(result);

    return {
      success: true,
      data: result,
    };
  }
}
