import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Insert } from "@request/builder/Insert";

export class InsertHandler implements SubmitHandlerInterface {
  protected entity: string;

  constructor({ entity }: { entity: string }) {
    this.entity = entity;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const insertRequestBuilder = new Insert({ entity: this.entity, data: values });

    return await insertRequestBuilder.build();
  }
}
