"use client";

import React, { ReactNode } from "react";
import { EmptyMessage } from "@global/component/listing/message/empty";
import { ErrorMessage } from "@global/component/listing/message/error";
import { LoadingMessage } from "@global/component/listing/message/loading";

interface ViewingProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  renderItem: (item: T) => ReactNode;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
}

export function Viewing<T>({
  data,
  loading,
  error,
  renderItem,
  loadingComponent = <LoadingMessage />,
  emptyComponent = <EmptyMessage />,
  errorComponent = error ? <ErrorMessage error={error} /> : null,
}: ViewingProps<T>) {
  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return <>{errorComponent}</>;
  }

  if (!data) {
    return <>{emptyComponent}</>;
  }

  return renderItem(data);
}
