import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Post as ResponseHandler } from "@global/request/response/handler/Post";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type PostProps = {
  entity: string;
  body: any;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Post extends RequestBuilder {
  constructor({ entity, body, headers = null, responseHandler = null }: PostProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/${entity}`;
    const method: Methods = "POST";
    responseHandler = responseHandler || new ResponseHandler({});
    super({ endpoint, method, headers, body, responseHandler });
  }
}
