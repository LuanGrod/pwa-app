import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { DeleteResponse } from "@global/type/request/Delete";

type DeleteProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: DeleteResponse) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Delete extends ResponseHandler {
  protected successMessage: string;

  constructor({
    successMessage = "Exclusão realizada com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: DeleteProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(result: DeleteResponse): Promise<any> {
    this.successSetup(result);

    return {
      success: true,
      data: result,
    };
  }
}
