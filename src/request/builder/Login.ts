import { Methods } from "@/type/Methods";
import { RequestBuilder } from "./Builder";
import { Login as ResponseHandler } from "@request/response/handler/Login";
import { DefaultApi } from "../error/handler/collection/DefaultApi";

type LoginProps = {
  entity?: string | null;
  data: any;
};

export class Login extends RequestBuilder {
  constructor({ entity, data }: LoginProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity ? `${apiUrl}/login/${entity}` : `${apiUrl}/login`;

    const method: Methods = "POST";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const responseHandler = new ResponseHandler({ errorHandlerCollection: new DefaultApi() });

    super({ endpoint, method, headers, data, responseHandler });
  }
}
