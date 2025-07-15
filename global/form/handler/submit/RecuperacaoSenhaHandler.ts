import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { RecuperacaoSenha } from "@global/request/builder/RecuperacaoSenha";

export class RecuperacaoSenhaHandler implements SubmitHandlerInterface {
  protected entity?: string | null;
  public needsAuthorization: boolean;

  constructor({ entity, needsAuthorization }: { entity: string, needsAuthorization?: boolean }) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const RecuperacaoSenhaRequestBuilder = new RecuperacaoSenha({ entity: this.entity, data: values });
    return await RecuperacaoSenhaRequestBuilder.build();
  }
}
