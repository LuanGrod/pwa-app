import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { InsertResponse } from "@global/type/request/Insert";

type InsertProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: InsertResponse) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Insert extends ResponseHandler {
  protected successMessage: string;

  constructor({
    successMessage = "Cadastro realizado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: InsertProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
    this.successMessage = successMessage;
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
