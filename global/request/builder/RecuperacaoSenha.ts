import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/RecuperacaoSenha";
import { RecuperacaoSenhaBuilderProps } from "@global/type/request/builder/RecuperacaoSenha";
import { BUILDER_PATHS } from "./constants/ApiPaths";

export class RecuperacaoSenha extends RequestBuilder {
  constructor(props: RecuperacaoSenhaBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.RecuperacaoSenha;
  }

  protected getMethod(): Methods {
    return "POST";
  }
}
