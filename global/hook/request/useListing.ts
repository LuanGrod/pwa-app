import { Dispatch, SetStateAction } from "react";
import { Listing } from "@global/request/builder/api/Listing";
import { ListingBuilderProps } from "@global/type/request/builder/Listing";
import { useApiRequest } from "./useApiRequest";
import { ListingResponse } from "@global/type/request/response/handler/Listing";

type UseListingProps = Omit<ListingBuilderProps, "responseHandler"> & {
  needsAuthorization?: boolean;
};

type UseListingReturn<T> = {
  data: ListingResponse<T>;
  setData: Dispatch<SetStateAction<ListingResponse<T>>>;
  loading: boolean;
  error?: string;
  refetch: () => Promise<void>;
};

/**
 * Hook especializado para buscar listagens paginadas
 * 
 * @param props - Propriedades do Listing builder
 * @returns Estado e funções para gerenciar a listagem
 */
export function useListing<T = any>({
  entity,
  id,
  parentEntity,
  parentId,
  headers,
  params,
  needsAuthorization = false,
}: UseListingProps): UseListingReturn<T> {
  return useApiRequest<ListingResponse<T>, Listing>({
    builderClass: Listing,
    builderProps: {
      entity,
      id,
      parentEntity,
      parentId,
      headers,
      params,
    },
    needsAuthorization,
    initialData: {
      currentPage: 1,
      resultsPerPage: 5,
      totalRows: 0,
      rows: [],
    },
    dependencies: [entity, id, parentEntity, parentId],
  });
}
