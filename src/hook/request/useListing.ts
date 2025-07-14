import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Listing } from "@request/builder/Listing";

type UseListingProps = {
  entity: string;
  parentEntity?: string;
  parentId?: number;
  params?: Record<string, any>;
  headers?: HeadersInit;
  autoFetch?: boolean;
  needsAuthorization?: boolean;
};

type UseListingReturn<T> = {
  // deleteItem: (id: number) => Promise<void>;
  data: Listagem<T>;
  setData: Dispatch<SetStateAction<Listagem<T>>>;
  loading: boolean;
  deleting: boolean;
  error: string | null;
};

export function useListing<T = any>({
  entity,
  parentEntity,
  parentId,
  headers,
  params,
  autoFetch = true,
  needsAuthorization = false,
}: UseListingProps): UseListingReturn<T> {
  const [data, setData] = useState<Listagem<T>>({
    currentPage: 1,
    resultsPerPage: 5,
    totalRows: 0,
    rows: [],
  });
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const listing = new Listing({
          entity: entity,
          parentEntity: parentEntity || "",
          parentId: parentId || 0,
          headers: headers || {},
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
    // deleteItem,
    data,
    setData,
    loading,
    error,
    deleting,
  };
}
