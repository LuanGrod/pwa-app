import { RecuperacaoSenha as RecuperacaoSenhaRequestBuilder } from "../RecuperacaoSenha";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/api/RecuperacaoSenha";
import { RecuperacaoSenhaBuilderProps } from "@global/type/request/builder/RecuperacaoSenha";

export class RecuperacaoSenha extends RecuperacaoSenhaRequestBuilder {
  constructor(props: RecuperacaoSenhaBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
