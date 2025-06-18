import { ResponseHandlerInterface } from "./HandlerInterface";
import { CollectionInterface as ErrorHandlerCollection } from "../../error/handler/collection/CollectionInterface";
import { HandlerInterface } from "@/request/error/handler/HandlerInterface";

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
    let errorResponse = {};
    console.log("response handler -> handleError -> \n", error);
    this.errorHandlerCollection?.get().forEach((errorHandler: HandlerInterface) => {
      let errorMessage = errorHandler.handle(error);
      if (errorMessage) {
        errorResponse = {
          success: false,
          messageType: "error",
          message: errorMessage,
        };
      }
    });

    return errorResponse;
  }
}
