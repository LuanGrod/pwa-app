import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";
import CookieInterface from "@global/cookie/CookieInterface";
import Cookie from "@global/cookie/Cookie";
import { LoginResponse } from "@global/type/request/Login";
import { startTransition } from "react";
import { GetRow } from "@global/request/builder/GetRow";

type LoginProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
  props?: Map<string, any>;
};

export class Login extends ResponseHandler {
  protected successMessage: string;
  protected cookie: CookieInterface;
  protected expirationDate: Date;
  protected props?: Map<string, any>;

  constructor({
    successMessage = "Login realizado com sucesso!",
    errorHandlerCollection = null,
    props,
  }: LoginProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
    this.cookie = new Cookie();
    this.expirationDate = new Date();
    this.props = props;
  }

  protected async handleSuccess(result: LoginResponse): Promise<any> {
    if (!result.userNotFound) {
      const { token, id } = result;
      this.expirationDate.setMonth(this.expirationDate.getMonth() + 1);
      this.cookie.setCookie("token", token, this.expirationDate);
      this.cookie.setCookie("id", id.toString(), this.expirationDate);

      const setUser = this.props?.get("setUser");
      const entity = this.props?.get("entity");
      const params = this.props?.get("params");

      if (entity && params && setUser) {
        const getRow = new GetRow({
          entity: entity,
          id: id,
        });

        const response = await getRow.build(true);

        const usuario = params.reduce(
          (acc: Record<string, any>, [finalKey, responseKey]: [string, string]) => {
            acc[finalKey] = response.data[responseKey];
            return acc;
          },
          {}
        );

        setUser(usuario);
      }
    }

    startTransition(() => {
      window.location.href = "/";
    });
  }
}
