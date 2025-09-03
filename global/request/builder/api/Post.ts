import { Post as PostRequestBuilder } from "../Post";
import { Post as ResponseHandler } from "@global/request/response/handler/api/Post";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type PostProps = {
  entity: string;
  body: any;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Post extends PostRequestBuilder {
  constructor({ entity, body, headers = null, responseHandler = null }: PostProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, body, headers, responseHandler });
  }
}
