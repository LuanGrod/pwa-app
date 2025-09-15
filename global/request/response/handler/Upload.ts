import { ResponseHandler } from "./Handler";
import { UploadResponse } from "@global/type/request/Upload";
import { ResponseHandlerProps } from "@global/type/request/ResponseHandlerProps";

export class Upload extends ResponseHandler {
  constructor({
    successMessage = "Upload realizado com sucesso!",
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<UploadResponse> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
