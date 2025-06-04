import { ResponseHandlerInterface } from "./HandlerInterface";
import { CollectionInterface as ErrorHandlerCollection } from "../../error/handler/collection/CollectionInterface";

type ResponseHandlerProps = {
  onSuccessFn?: (result: any) => any;
  onErrorFn?: (error: Error) => any;
  errorHandlerCollection?: ErrorHandlerCollection;
};

export class ResponseHandler implements ResponseHandlerInterface {
  protected onSuccessFn: (result: any) => any;
  protected onErrorFn: (error: Error) => any;
  protected errorHandlerCollection?: ErrorHandlerCollection;

  constructor({ onSuccessFn, onErrorFn, errorHandlerCollection }: ResponseHandlerProps) {
    this.onSuccessFn = onSuccessFn ?? (() => {});
    this.onErrorFn = onErrorFn ?? (() => {});
    this.errorHandlerCollection = errorHandlerCollection;
  }

  onSuccess(result: any): any {
    return this.onSuccessFn(result);
  }

  onError(error: Error): any {
    return this.onErrorFn(error);
  }

  protected handleError(error: Error): any {
    this.errorHandlerCollection?.get().forEach((errorHandler: any) => {
      let errorMessage = errorHandler.handle(error);
      if (errorMessage) {
        return {
          success: false,
          messageType: "error",
          message: errorMessage,
        };
      }
    });
  }
}
