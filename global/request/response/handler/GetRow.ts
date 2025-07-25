import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type GetRowProps<T> = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: T) => Promise<void> | void;
};

export class GetRow<T = any> extends ResponseHandler {
  protected onSuccessCallback?: (result: any) => Promise<void> | void;

  constructor({ errorHandlerCollection = null, onSuccessCallback }: GetRowProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
    this.onSuccessCallback = onSuccessCallback;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  /**
   * Handles a successful response. Executes the optional callback if provided.
   */
  protected async handleSuccess(data: T): Promise<any> {
    this.successSetup(data);
    
    return {
      success: true,
      data: data,
    };
  }
}
