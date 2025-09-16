"use client";

import React, { ReactNode } from "react";
import { EmptyMessage } from "@global/component/message/empty";
import { ErrorMessage } from "@global/component/message/error";
import { LoadingMessage } from "@global/component/message/loading";

interface ViewingProps<T> {
  data?: T;
  loading: boolean;
  error?: string;
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
