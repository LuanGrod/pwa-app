import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Login } from "@request/builder/Login";

export class LoginHandler implements SubmitHandlerInterface {
  protected entity?: string | null;
  protected props: Map<string, any>;
  public needsAuthorization: boolean;

  constructor({
    entity,
    props,
    needsAuthorization,
  }: {
    entity?: string | null;
    props: Map<string, any>;
    needsAuthorization?: boolean;
  }) {
    this.entity = entity;
    this.props = props;

    this.needsAuthorization = needsAuthorization || false;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const loginRequestBuilder = new Login({ entity: this.entity, data: values, props: this.props });
    return await loginRequestBuilder.build();
  }
}
