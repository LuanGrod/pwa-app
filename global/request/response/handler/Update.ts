import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

export type UpdateProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Update extends ResponseHandler {
  protected successMessage: string;

  constructor({
    successMessage = "Edição realizada com sucesso!",
    errorHandlerCollection = null,
  }: UpdateProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(result: any): Promise<any> {
    return {
      success: true,
      messageType: "success",
      message: this.successMessage,
      data: result,
    };
  }
}
