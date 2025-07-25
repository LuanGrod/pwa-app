import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { GetRow } from "@global/request/builder/api/GetRow";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type UseGetRowProps = {
  entity: string;
  id: string;
  parentEntity?: string;
  parentId?: number;
  params?: Record<string, any>;
  headers?: HeaderHandlerCollection | null;
  autoFetch?: boolean;
  needsAuthorization?: boolean;
};

type UseGetRowReturn<T> = {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  loading: boolean;
  error: string | null;
};

export function useGetRow<T = any>({
  entity,
  id,
  parentEntity,
  parentId,
  headers,
  params,
  autoFetch = true,
  needsAuthorization = false,
}: UseGetRowProps): UseGetRowReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    if (!id || !entity) {
      setLoading(false);
      return;
    }

    try {
      const getRow = new GetRow({
        entity: entity,
        id: id,
        parentEntity: parentEntity || "",
        parentId: parentId || 0,
        headers: headers || null,
        params: params || {},
      });
      const result = await getRow.build(needsAuthorization);

      if (!result.success) {
        setError(result.message[0]);
      }

      setData(result.data || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [entity, id, parentEntity, parentId, autoFetch]);

  return {
    data,
    setData,
    loading,
    error,
  };
}
