import { RequestBuilderProps } from "./RequestBuilderProps";

export type LoginBuilderProps<TBody = any> = Omit<RequestBuilderProps, "entity"> & {
  entity?: string;
  body: TBody;
};
