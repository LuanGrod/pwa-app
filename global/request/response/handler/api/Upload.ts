import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { ResponseHandler } from "../Handler";
import { UploadResponse } from "@global/type/request/response/handler/actions/Upload";
import { ApiResponseHandlerProps } from "@global/type/request/response/handler/ApiResponseHandlerProps";

export class Upload extends ResponseHandler {
  constructor({
    successMessage = "Upload realizado com sucesso!",
    onSuccessCallback,
    onSuccessActions,
  }: ApiResponseHandlerProps<UploadResponse> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
