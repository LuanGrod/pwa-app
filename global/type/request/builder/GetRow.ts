import { RequestBuilderProps } from "./RequestBuilderProps";

export type GetRowBuilderProps = RequestBuilderProps & {
  id?: string;
  parentEntity?: string;
  parentId?: number;
  params?: Record<string, any>;
};
