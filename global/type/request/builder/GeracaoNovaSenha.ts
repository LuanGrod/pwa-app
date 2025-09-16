import { RequestBuilderProps } from "./RequestBuilderProps";

export type GeracaoNovaSenhaBuilderProps<TBody = any> = Omit<RequestBuilderProps, "entity"> & {
  entity?: string;
  body: TBody;
};
