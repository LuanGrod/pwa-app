import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { DeleteResponse } from "@global/type/request/Delete";

type DeleteProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: DeleteResponse) => Promise<void> | void;
};

export class Delete extends ResponseHandler {
  protected successMessage: string;
  protected onSuccessCallback?: (result: DeleteResponse) => Promise<void> | void;

  constructor({
    successMessage = "Exclusão realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: DeleteProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
    this.successMessage = successMessage;
    this.onSuccessCallback = onSuccessCallback;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  /**
   * Handles a successful response. Executes the optional callback if provided.
   */
  protected async handleSuccess(result: DeleteResponse): Promise<any> {
    
    this.successSetup(result);
    
    return {
      success: true,
      data: result,
    };
  }
}
