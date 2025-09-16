import { RequestBuilderProps } from "./RequestBuilderProps";

export type UploadBuilderProps<TBody = any> = RequestBuilderProps & {
  body: TBody;
  uploadField: string;
};