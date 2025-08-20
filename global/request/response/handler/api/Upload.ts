import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Upload as UploadResponseHandler } from "../Upload";
import { UploadResponse } from "@global/type/request/Upload";

type UploadProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  onSuccessCallback?: (result: UploadResponse) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Upload extends UploadResponseHandler {
  constructor({
    successMessage = "Upload realizado com sucesso!",
    errorHandlerCollection = null,
    onSuccessCallback,
    onSuccessActions,
  }: UploadProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
