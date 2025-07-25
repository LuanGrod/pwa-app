import { Upload as UploadRequestBuilder } from "../Upload";
import { Upload as ResponseHandler } from "@global/request/response/handler/api/Upload";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type UploadProps = {
  entity: string;
  body: any;
  headers?: HeaderHandlerCollection | null;
  data?: Map<string, any>;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Upload extends UploadRequestBuilder {
  constructor({ entity, body, headers = null, data, responseHandler = null }: UploadProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, body, headers, data, responseHandler });
  }
}
