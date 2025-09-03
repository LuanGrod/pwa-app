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
  data?: Map<string, any>;
  onSuccessCallback?: (result: any) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};

export class Login extends ResponseHandler {
  protected successMessage: string;
  protected cookie: CookieInterface;
  protected expirationDate: Date;
  protected data?: Map<string, any>;

  constructor({
    successMessage = "Login realizado com sucesso!",
    errorHandlerCollection = null,
    data,
    onSuccessCallback,
    onSuccessActions,
  }: LoginProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
    this.successMessage = successMessage;
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
    this.cookie = new Cookie();
    this.expirationDate = new Date();
    this.data = data;
  }

  protected async handleSuccess(result: LoginResponse): Promise<any> {
    console.log("handleSuccess iniciado", result);
    this.successSetup(result);

    const router = this.data?.get("router");
    console.log("Router obtido:", router, typeof router);

    if (!result.userNotFound) {
      const { token, id } = result;
      console.log("Usuario encontrado, token:", !!token, "id:", id);
      
      this.expirationDate.setMonth(this.expirationDate.getMonth() + 1);
      this.cookie.setCookie("token", token, this.expirationDate);
      this.cookie.setCookie("id", id.toString(), this.expirationDate);
      
      console.log("Cookies definidos");

      const setUser = this.data?.get("setUser");
      const entity = this.data?.get("entity");
      const params = this.data?.get("params");

      if (entity && params && setUser) {
        console.log("Buscando dados do usuario...");
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

        console.log("Usuario configurado:", usuario);
        setUser(usuario);
      }
    }

    console.log("Router antes do redirect:", router, typeof router?.push);

    // Em produção, usar window.location pode ser mais confiável
    if (typeof window !== 'undefined') {
      console.log("Usando window.location.replace para redirect");
      setTimeout(() => {
        console.log("Executando redirect após delay");
        window.location.replace('/');
      }, 100);
    } else if (router && typeof router.push === 'function') {
      console.log("Executando router.push (fallback)");
      startTransition(() => {
        console.log("Dentro do startTransition, fazendo push para /");
        router.push("/");
      });
    } else {
      console.error('Nenhum método de redirect disponível');
    }
    
    console.log("handleSuccess finalizado");
  }
}
