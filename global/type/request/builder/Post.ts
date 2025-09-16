import { RequestBuilderProps } from "./RequestBuilderProps";

export type PostBuilderProps<TBody = any> = RequestBuilderProps & {
  body: TBody;
};
