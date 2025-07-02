import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Insert } from "@request/builder/Insert";

export class InsertHandler implements SubmitHandlerInterface {
  protected entity: string;
  public needsAuthorization: boolean;

  constructor({ entity, needsAuthorization }: { entity: string, needsAuthorization?: boolean }) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const insertRequestBuilder = new Insert({ entity: this.entity, data: values });

    return await insertRequestBuilder.build(this.needsAuthorization);
  }
}
