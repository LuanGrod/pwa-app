import { RequestBuilder } from "./Builder";
import { Insert as ResponseHandler } from "../response/handler/Insert";

type InsertProps = {
  entity: string;
  data: any;
  parentEntity?: string | null;
  parentId?: number | null;
};

export class Insert extends RequestBuilder {
  constructor({ entity, data, parentEntity = null, parentId = null }: InsertProps) {
    const apiUrl = process.env.PUBLIC_API_URL;

    const endpoint = parentEntity ? `${apiUrl}/${parentEntity}/${parentId}/${entity}` : `${apiUrl}/${entity}`;

    const method: Methods = "POST";

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, data, responseHandler });
  }
}
