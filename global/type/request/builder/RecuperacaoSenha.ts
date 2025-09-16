import { RequestBuilderProps } from "./RequestBuilderProps";

export type RecuperacaoSenhaBuilderProps<TBody = any> = Omit<RequestBuilderProps, "entity"> & {
  entity?: string;
  body: TBody;
};
