import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Upload as ResponseHandler } from "@global/request/response/handler/Upload";
import { Collection as HeaderCollection } from "../header/handler/collection/Collection";
import { UploadBuilderProps } from "@global/type/request/builder/Upload";
import { BUILDER_PATHS } from "@global/constants/request/builder/ApiPaths";

export class Upload extends RequestBuilder {
  private uploadField: string;

  constructor(props: UploadBuilderProps) {
    const headers = props.headers || new HeaderCollection({ elements: [] });
    const responseHandler = props.responseHandler || new ResponseHandler({});

    super({ ...props, headers, responseHandler });

    this.uploadField = props.uploadField;
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.Upload;
  }

  protected getMethod(): Methods {
    return "POST";
  }

  protected configure(props: any) {
    const { entity, headers, responseHandler, body, uploadField } =
      props;

    return {
      endpoint: this.buildCustomEndpoint(entity, uploadField),
      method: this.getMethod(),
      headers: headers,
      body: body || null,
      responseHandler: responseHandler || new ResponseHandler({}),
    };
  }

  private buildCustomEndpoint(entity?: string, uploadField?: string): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return `${apiUrl}/upload/${entity}/${uploadField}`;
  }
}
