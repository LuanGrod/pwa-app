import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type InsertProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Insert extends ResponseHandler {
  protected successMessage: string;

  constructor({ successMessage = "Cadastro realizado com sucesso!", errorHandlerCollection = null }: InsertProps) {
    super({ errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection() });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected handleSuccess(result: any): any {
    return {
      success: true,
      messageType: "success",
      message: this.successMessage,
      data: result,
    };
  }
}
