import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { UpdateResponse } from "@global/type/request/Update";

export type UpdateProps<T> = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: UpdateResponse<T>) => Promise<void> | void;
};

export class Update<T = any> extends ResponseHandler {
  protected successMessage: string;
  protected onSuccessCallback?: (result: UpdateResponse<T>) => Promise<void> | void;

  constructor({
    successMessage = "Edição realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: UpdateProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
    this.successMessage = successMessage;
    this.onSuccessCallback = onSuccessCallback;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  /**
   * Handles a successful response. Executes the optional callback if provided.
   */
  protected async handleSuccess(result: UpdateResponse<T>): Promise<any> {
    this.successSetup(result);
    return {
      success: true,
      messageType: "success",
      message: this.successMessage,
      data: result,
    };
  }
}
