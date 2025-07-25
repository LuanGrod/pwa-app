import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Upload as ResponseHandler } from "@global/request/response/handler/Upload";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";
import { Collection as HeaderCollection } from "../header/handler/collection/Collection";
import ContentType from "../header/handler/ContentType";

type UploadProps = {
  entity: string;
  body: any;
  headers?: HeaderHandlerCollection | null;
  data?: Map<string, any>;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Upload extends RequestBuilder {
  constructor({ entity, body, headers = null, data, responseHandler = null }: UploadProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const field = data?.get("field");

    const endpoint = `${apiUrl}/upload/${entity}/${field}`;

    const method: Methods = "POST";

    // We use an empty array for elements because FormData uploads require the browser to set headers like Content-Type automatically.
    const headerHandlers =
      headers || new HeaderCollection({ elements: [] });

    responseHandler = responseHandler || new ResponseHandler({});

    super({ endpoint, method, headers: headerHandlers, body, responseHandler });
  }
}
