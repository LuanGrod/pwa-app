import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { InsertResponse } from "@global/type/request/Insert";

type InsertProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  /**
   * Optional callback to be executed on success, before returning the result.
   */
  onSuccessCallback?: (result: InsertResponse) => Promise<void> | void;
};

export class Insert extends ResponseHandler {
  protected successMessage: string;
  protected onSuccessCallback?: (result: InsertResponse) => Promise<void> | void;

  constructor({
    successMessage = "Cadastro realizado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
  }: InsertProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
    });
    this.successMessage = successMessage;
    this.onSuccessCallback = onSuccessCallback;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(result: InsertResponse): Promise<any> {
    this.successSetup(result);

    return {
      success: true,
      messageType: "success",
      message: this.successMessage,
      data: result,
    };
  }
}
