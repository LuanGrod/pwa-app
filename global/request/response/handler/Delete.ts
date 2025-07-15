import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type DeleteProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Delete extends ResponseHandler {
  protected successMessage: string;

  constructor({ successMessage = "Exclusão realizada com sucesso!", errorHandlerCollection = null }: DeleteProps) {
    super({ errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection() });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(result: any): Promise<any> {
    return {
      success: true,
      data: result,
    };
  }
}
