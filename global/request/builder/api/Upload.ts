import { Upload as UploadRequestBuilder } from "../Upload";
import { Upload as ResponseHandler } from "@global/request/response/handler/api/Upload";
import { UploadBuilderProps } from "@global/type/request/builder/Upload";

export class Upload extends UploadRequestBuilder {
  constructor(props: UploadBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
