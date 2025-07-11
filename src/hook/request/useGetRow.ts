import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { GetRow } from "@/request/builder/GetRow";

type UseGetRowProps = {
  entity: string;
  id: string;
  parentEntity?: string;
  parentId?: number;
  params?: Record<string, any>;
  headers?: HeadersInit;
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

    try {
      const getRow = new GetRow({
        entity: entity,
        id: id,
        parentEntity: parentEntity || "",
        parentId: parentId || 0,
        headers: headers || {},
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
