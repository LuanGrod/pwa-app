import { ResponseHandlerInterface } from "./HandlerInterface";
import { CollectionInterface as ErrorHandlerCollection } from "../../error/handler/collection/CollectionInterface";
import { HandlerInterface } from "@global/request/error/handler/HandlerInterface";
import { ActionInterface } from "./action/ActionInterface";
import { DefaultResponse } from "@global/type/request/DefaultResponse";
import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { ResponseHandlerProps } from "@global/type/request/ResponseHandlerProps";

type BaseResponseHandlerProps = ResponseHandlerProps & {
  onSuccessFn?: (result: any) => any;
  onErrorFn?: (error: Error) => any;
};

export class ResponseHandler implements ResponseHandlerInterface {
  protected onSuccessFn: (result: any) => any;
  protected onErrorFn: (error: Error) => any;
  protected errorHandlerCollection?: ErrorHandlerCollection;
  protected onSuccessCallback?: (result: any) => Promise<void> | void;
  protected onSuccessActions?: ActionInterface[];
  protected successMessage?: string;

  constructor({
    onSuccessFn,
    onErrorFn,
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
    successMessage,
  }: BaseResponseHandlerProps) {
    this.onSuccessFn = onSuccessFn ?? this.handleSuccess.bind(this);
    this.onErrorFn = onErrorFn ?? this.handleError.bind(this);
    this.errorHandlerCollection = errorHandlerCollection ?? new DefaultErrorHandlerCollection();
    this.onSuccessCallback = onSuccessCallback;
    this.onSuccessActions = onSuccessActions;
    this.successMessage = successMessage;
  }

  onSuccess(result: any): any {
    return this.onSuccessFn(result);
  }

  onError(error: Error): any {
    return this.onErrorFn(error);
  }

  protected async handleSuccess<T>(result: T): Promise<DefaultResponse<T>> {
    await this.successSetup(result);

    return {
      success: true,
      ...(this.successMessage && {
        messageType: "success" as const,
        message: this.successMessage,
      }),
      data: result,
    };
  }

  protected handleError(error: Error): any {
    let errorResponse = {};
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

  protected async successSetup<T>(result: T) {
    if (this.onSuccessCallback) {
      await this.onSuccessCallback(result);
    }

    if (this.onSuccessActions) {
      for (const action of this.onSuccessActions) {
        try {
          await action.handleSuccess(result);
        } catch (error) {
          console.error(`Action ${action.constructor.name} failed:`, error);
          break;
        }
      }
    }
  }
}
