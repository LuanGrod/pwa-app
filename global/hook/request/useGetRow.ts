import { Dispatch, SetStateAction } from "react";
import { GetRow } from "@global/request/builder/api/GetRow";
import { GetRowBuilderProps } from "@global/type/request/builder/GetRow";
import { useApiRequest } from "./useApiRequest";

type UseGetRowProps = Omit<GetRowBuilderProps, "responseHandler"> & {
  needsAuthorization?: boolean;
};

type UseGetRowReturn<T> = {
  data?: T;
  setData: Dispatch<SetStateAction<T | undefined>>;
  loading: boolean;
  error?: string;
  refetch: () => Promise<void>;
};

/**
 * Hook especializado para buscar uma única linha de dados
 * 
 * @param props - Propriedades do GetRow builder
 * @returns Estado e funções para gerenciar a busca de linha
 */
export function useGetRow<T = any>({
  entity,
  id,
  parentEntity,
  parentId,
  headers,
  params,
  needsAuthorization = false,
}: UseGetRowProps): UseGetRowReturn<T> {
  const shouldFetch = Boolean(entity && id);

  return useApiRequest<T | undefined, GetRow>({
    builderClass: GetRow,
    builderProps: {
      entity,
      id,
      parentEntity,
      parentId,
      headers,
      params,
    },
    needsAuthorization,
    initialData: undefined,
    dependencies: [entity, id, parentEntity, parentId],
    shouldFetch,
  });
}
