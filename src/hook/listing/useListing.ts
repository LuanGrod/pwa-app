import { useState, useEffect } from "react";
import { Listing } from "@request/builder/Listing";
import { Delete } from "@request/builder/Delete";

type UseListingProps = {
  entity: string;
  parentEntity?: string;
  parentId?: number;
  autoFetch?: boolean;
};

type UseListingReturn<T> = {
  deleteItem: (id: number) => Promise<void>;
  data: T[];
  loading: boolean;
  error: string | null;
};

export function useListing<T = any>({
  entity,
  parentEntity,
  parentId,
  autoFetch = true,
}: UseListingProps): UseListingReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const listing = new Listing({ entity: entity, parentEntity: parentEntity || "", parentId: parentId || 0 });
      const result = await listing.build();
      setData(result.data || []);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    setDeleting(true);
    setError(null);

    try {
      const deleteItem = new Delete({ entity: entity, id: id });
      await deleteItem.build();
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [entity, parentEntity, parentId, autoFetch]);

  return {
    deleteItem,
    data,
    loading,
    error,
  };
}
