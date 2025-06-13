import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { GeracaoNovaSenha } from "@request/builder/GeracaoNovaSenha";

export class GeracaoNovaSenhaHandler implements SubmitHandlerInterface {
  protected entity?: string | null;

  constructor({ entity }: { entity?: string | null }) {
    this.entity = entity;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const geracaoNovaSenhaRequestBuilder = new GeracaoNovaSenha({ entity: this.entity, data: values });
    return await geracaoNovaSenhaRequestBuilder.build();
  }
}
