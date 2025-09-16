import { RequestBuilderProps } from "./RequestBuilderProps";

export type UpdateBuilderProps<TBody = any> = RequestBuilderProps & {
  body: TBody;
  id?: string;
};
