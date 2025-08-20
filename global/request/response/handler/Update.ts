import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { UpdateResponse } from "@global/type/request/Update";

export type UpdateProps<T> = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: UpdateResponse<T>) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Update<T = any> extends ResponseHandler {
  protected successMessage: string;

  constructor({
    successMessage = "Edição realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: UpdateProps<T>) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

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
