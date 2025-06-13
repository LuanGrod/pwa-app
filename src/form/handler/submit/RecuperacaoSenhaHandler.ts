import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { RecuperacaoSenha } from "@request/builder/RecuperacaoSenha";

export class RecuperacaoSenhaHandler implements SubmitHandlerInterface {
  protected entity?: string | null;

  constructor({ entity }: { entity?: string | null }) {
    this.entity = entity;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const RecuperacaoSenhaRequestBuilder = new RecuperacaoSenha({ entity: this.entity, data: values });
    return await RecuperacaoSenhaRequestBuilder.build();
  }
}
