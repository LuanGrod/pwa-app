import { Update as UpdateRequestBuilder } from "../Update";
import { Update as ResponseHandler } from "@global/request/response/handler/api/Update";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type UpdateProps = {
  entity: string;
  data: any;
  id: string;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Update extends UpdateRequestBuilder {
  constructor({ entity, data, id, headers = {}, responseHandler = null }: UpdateProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, data, id, headers, responseHandler });
  }
}
