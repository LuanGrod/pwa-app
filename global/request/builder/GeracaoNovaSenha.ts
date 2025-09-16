import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/GeracaoNovaSenha";
import { GeracaoNovaSenhaBuilderProps } from "@global/type/request/builder/GeracaoNovaSenha";
import { BUILDER_PATHS } from "./constants/ApiPaths";

export class GeracaoNovaSenha extends RequestBuilder {
  constructor(props: GeracaoNovaSenhaBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.GeracaoNovaSenha;
  }

  protected getMethod(): Methods {
    return "POST";
  }
}
