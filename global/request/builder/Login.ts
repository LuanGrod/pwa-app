import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Login as ResponseHandler } from "@global/request/response/handler/Login";
import { LoginBuilderProps } from "@global/type/request/builder/Login";
import { BUILDER_PATHS } from "./constants/ApiPaths";

export class Login extends RequestBuilder {
  constructor(props: LoginBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.Login;
  }

  protected getMethod(): Methods {
    return "POST";
  }
}
