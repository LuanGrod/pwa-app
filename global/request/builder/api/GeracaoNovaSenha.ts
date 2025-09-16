import { GeracaoNovaSenha as GeracaoNovaSenhaRequestBuilder } from "../GeracaoNovaSenha";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/api/GeracaoNovaSenha";
import { GeracaoNovaSenhaBuilderProps } from "@global/type/request/builder/GeracaoNovaSenha";

export class GeracaoNovaSenha extends GeracaoNovaSenhaRequestBuilder {
  constructor(props: GeracaoNovaSenhaBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
