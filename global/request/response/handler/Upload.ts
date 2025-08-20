import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import { UploadResponse } from "@global/type/request/Upload";

export type UploadProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: UploadResponse) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Upload extends ResponseHandler {
  protected successMessage: string;

  constructor({
    successMessage = "Upload realizado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: UploadProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(result: UploadResponse): Promise<any> {
    this.successSetup(result);
    return {
      success: true,
      messageType: "success",
      message: this.successMessage,
      data: result,
    };
  }
}
