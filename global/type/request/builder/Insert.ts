import { RequestBuilderProps } from "./RequestBuilderProps";

export type InsertBuilderProps<TBody = any> = RequestBuilderProps & {
  body: TBody;
  parentEntity?: string;
  parentId?: number;
};