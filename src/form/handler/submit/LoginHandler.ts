import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Login } from "@request/builder/Login";

export class LoginHandler implements SubmitHandlerInterface {
  protected entity?: string | null;

  constructor({ entity }: { entity?: string | null }) {
    this.entity = entity;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const loginRequestBuilder = new Login({ entity: this.entity, data: values });
    return await loginRequestBuilder.build();
  }
}
