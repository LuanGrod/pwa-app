import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type ListingProps<T> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: Listagem<T>) => Promise<void> | void;
};

export class Listing<T = any> extends ResponseHandler {
  protected onSuccessCallback?: (result: any) => Promise<void> | void;

  constructor({ errorHandlerCollection = null, onSuccessCallback }: ListingProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
    this.onSuccessCallback = onSuccessCallback;
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
