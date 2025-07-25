import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { Upload as UploadResponseHandler } from "../Upload";

type UploadProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Upload extends UploadResponseHandler {
  constructor({
    successMessage = "Upload realizado com sucesso!",
    errorHandlerCollection = null,
  }: UploadProps) {
    super({
      successMessage,
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
  }
}
