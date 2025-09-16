import { ResponseHandler } from "./Handler";
import { UploadResponse } from "@global/type/request/response/handler/actions/Upload";
import { ResponseHandlerProps } from "@global/type/request/response/handler/ResponseHandlerProps";

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
