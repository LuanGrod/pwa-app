import { Login as LoginRequestBuilder } from "../Login";
import { Login as ResponseHandler } from "@global/request/response/handler/api/Login";
import { LoginBuilderProps } from "@global/type/request/builder/Login";

export class Login extends LoginRequestBuilder {
  constructor(props: LoginBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
