import { RequestBuilder } from "./Builder";
import { Update as ResponseHandler } from "@request/response/handler/Update";

type UpdateProps = {
  entity: string;
  data: any;
  id: number;
};

export class Update extends RequestBuilder {
  constructor({ entity, data, id }: UpdateProps) {
    const apiUrl = process.env.PUBLIC_API_URL;

    const endpoint = `${apiUrl}/${entity}/${id}`;

    const method = "PUT";

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, data, responseHandler });
  }
}
