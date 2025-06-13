import { RequestBuilder } from "./Builder";
import { Insert as ResponseHandler } from "../response/handler/Insert";
import { Methods } from "@/type/Methods";

type InsertProps = {
  entity: string;
  data: any;
  parentEntity?: string | null;
  parentId?: number | null;
};

export class Insert extends RequestBuilder {
  constructor({ entity, data, parentEntity = null, parentId = null }: InsertProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = parentEntity ? `${apiUrl}/${parentEntity}/${parentId}/${entity}` : `${apiUrl}/${entity}`;

    const method: Methods = "POST";

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, data, responseHandler });
  }
}
