import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Viewing } from "@request/builder/Viewing";

type UseViewingProps = {
  entity: string;
  id: string;
  parentEntity?: string;
  parentId?: number;
  params?: Record<string, any>;
  headers?: HeadersInit;
  autoFetch?: boolean;
  needsAuthorization?: boolean;
};

type UseViewingReturn<T> = {
  // deleteItem: (id: number) => Promise<void>;
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  loading: boolean;
  deleting: boolean;
  error: string | null;
};

//useGetRow
export function useViewing<T = any>({
  entity,
  id,
  parentEntity,
  parentId,
  headers,
  params,
  autoFetch = true,
  needsAuthorization = false,
}: UseViewingProps): UseViewingReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const viweing = new Viewing({
        entity: entity,
        id: id,
        parentEntity: parentEntity || "",
        parentId: parentId || 0,
        headers: headers || {},
        params: params || {},
      });
      const result = await viweing.build(needsAuthorization);

      if (!result.success) {
        setError(result.message[0]);
      }

      setData(result.data || null);
    } finally {
      setLoading(false);
    }
  };

  // const deleteItem = async (id: number) => {
  //   setDeleting(true);
  //   setError(null);

  //   try {
  //     const deleteItem = new Delete({ entity: entity, id: id });
  //     await deleteItem.build();
  //     setData((prevData) => prevData.rows.filter((item: any) => item.id !== id));
  //   } finally {
  //     setDeleting(false);
  //   }
  // };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [entity, id, parentEntity, parentId, autoFetch]);

  return {
    // deleteItem,
    data,
    setData,
    loading,
    error,
    deleting,
  };
}
