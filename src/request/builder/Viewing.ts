import { Methods } from "@/type/Methods";
import { RequestBuilder } from "./Builder";
import { Viewing as ResponseHandler } from "@request/response/handler/Viewing";

type ViewingProps = {
  entity: string;
  id: string;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
  headers?: HeadersInit;
};

export class Viewing extends RequestBuilder {
  constructor({ entity, id, parentEntity = null, parentId = null, params = {}, headers = {} }: ViewingProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = parentEntity ? `${apiUrl}/${parentEntity}/${parentId}/${entity}/${id}` : `${apiUrl}/${entity}/${id}`;

    const method: Methods = "GET";

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, headers, data: null, responseHandler });
  }
}
