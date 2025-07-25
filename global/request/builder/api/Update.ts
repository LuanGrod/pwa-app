import { Update as UpdateRequestBuilder } from "../Update";
import { Update as ResponseHandler } from "@global/request/response/handler/api/Update";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type UpdateProps = {
  entity: string;
  body: any;
  id?: string | null;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Update extends UpdateRequestBuilder {
  constructor({ entity, body, id, headers = null, responseHandler = null }: UpdateProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, body, id, headers, responseHandler });
  }
}
