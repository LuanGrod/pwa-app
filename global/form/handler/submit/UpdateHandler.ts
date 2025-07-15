import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Update } from "@global/request/builder/Update";

export class UpdateHandler implements SubmitHandlerInterface {
  protected entity: string;
  public needsAuthorization: boolean;

  constructor({ entity, needsAuthorization }: { entity: string, needsAuthorization?: boolean }) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
  }

  async onSubmit(values: any, id: string): Promise<any> {
    const updateRequestBuilder = new Update({ entity: this.entity, data: values, id: id });

    return await updateRequestBuilder.build();
  }
}
