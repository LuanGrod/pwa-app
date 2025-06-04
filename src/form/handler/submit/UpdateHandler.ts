import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Update } from "@request/builder/Update";

export class UpdateHandler implements SubmitHandlerInterface {
  protected entity: string;

  constructor({ entity }: { entity: string }) {
    this.entity = entity;
  }

  async onSubmit(values: any, id: string): Promise<any> {
    const updateRequestBuilder = new Update({ entity: this.entity, data: values, id: id });

    return await updateRequestBuilder.build();
  }
}
