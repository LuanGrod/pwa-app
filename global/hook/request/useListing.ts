import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Listing } from "@global/request/builder/api/Listing";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type UseListingProps = {
  entity: string;
  id?: string;
  parentEntity?: string;
  parentId?: number;
  params?: Record<string, any>;
  headers?: HeaderHandlerCollection | null;
  needsAuthorization?: boolean;
};

type UseListingReturn<T> = {
  data: Listagem<T>;
  setData: Dispatch<SetStateAction<Listagem<T>>>;
  loading: boolean;
  error: string | null;
};

export function useListing<T = any>({
  entity,
  id,
  parentEntity,
  parentId,
  headers,
  params,
  needsAuthorization = false,
}: UseListingProps): UseListingReturn<T> {
  const [data, setData] = useState<Listagem<T>>({
    currentPage: 1,
    resultsPerPage: 5,
    totalRows: 0,
    rows: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      if(!entity) {
        setError("Entity is required.");
        setLoading(false);
        return;
      }

      try {
        const listing = new Listing({
          entity: entity,
          id: id || "",
          parentEntity: parentEntity || "",
          parentId: parentId || 0,
          headers: headers || undefined,
          params: params || {},
        });
        const result = await listing.build(needsAuthorization);

        if (!result.success) {
          setError(result.message[0]);
        }

        setData(
          result.data || {
            currentPage: 1,
            resultsPerPage: 5,
            totalRows: 0,
            rows: [],
          }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    setData,
    loading,
    error,
  };
}
