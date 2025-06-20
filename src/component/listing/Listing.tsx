"use client";

import React, { Fragment, ReactNode } from "react";
import { LoadingMessage } from "../message/loading";
import { ErrorMessage } from "../message/error";
import { EmptyMessage } from "../message/empty";

interface ListingProps<T> {
  data: Listagem<T> | [];
  loading: boolean;
  error: string | null;
  renderItem: (item: T) => ReactNode;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
}

export function Listing<T>({
  data,
  loading,
  error,
  renderItem,
  loadingComponent = <LoadingMessage />,
  emptyComponent = <EmptyMessage />,
  errorComponent = error ? <ErrorMessage error={error} /> : null,
}: ListingProps<T>) {
  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return <>{errorComponent}</>;
  }

  if (!("rows" in data) || data.rows.length === 0) {
    return <>{emptyComponent}</>;
  }

  return data.rows.map((item, index) => <Fragment key={index}>{renderItem(item)}</Fragment>);
}
