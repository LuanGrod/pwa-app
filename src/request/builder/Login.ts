import { RequestBuilder } from "./Builder";
import { Login as ResponseHandler } from "@request/response/handler/Login";

type LoginProps = {
  entity?: string | null;
  data: any;
};

export class Login extends RequestBuilder {
  constructor({ entity, data }: LoginProps) {
    const apiUrl = process.env.PUBLIC_API_URL;

    const endpoint = entity ? `${apiUrl}/login/${entity}` : `${apiUrl}/login`;

    const method = "POST";

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, data, responseHandler });
  }
}
