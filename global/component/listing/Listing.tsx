"use client";

import React, { Fragment, ReactNode } from "react";
import { EmptyMessage } from "@global/component/message/empty";
import { ErrorMessage } from "@global/component/message/error";
import { LoadingMessage } from "@global/component/message/loading";


interface ListingProps<T> {
  data?: T[];
  loading: boolean;
  error?: string;
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

  if (!data || data.length === 0) {
    return <>{emptyComponent}</>;
  }

  return data.map((item, index) => <Fragment key={index}>{renderItem(item)}</Fragment>);
}
