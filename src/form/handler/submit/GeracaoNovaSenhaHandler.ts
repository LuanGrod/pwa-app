import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { GeracaoNovaSenha } from "@request/builder/GeracaoNovaSenha";

export class GeracaoNovaSenhaHandler implements SubmitHandlerInterface {
  protected entity?: string | null;
  public needsAuthorization: boolean;

  constructor({ entity, needsAuthorization }: { entity: string, needsAuthorization?: boolean }) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const geracaoNovaSenhaRequestBuilder = new GeracaoNovaSenha({ entity: this.entity, data: values });
    return await geracaoNovaSenhaRequestBuilder.build();
  }
}
