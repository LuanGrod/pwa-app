import { Default as DefaultErrorHandlerCollection } from "@request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type LoginProps = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class Login extends ResponseHandler {
  protected successMessage: string;

  constructor({ successMessage = "Login realizado com sucesso!", errorHandlerCollection = null }: LoginProps) {
    super({ errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection() });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected handleSuccess(result: any): any {
    const rootUrl = process.env.PUBLIC_ROOT_URL;
    return (window.location.href = rootUrl!);
  }
}
