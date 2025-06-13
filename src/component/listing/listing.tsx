// components/Listing.tsx
import React, { ReactNode } from 'react';
import { LoadingMessage } from '../message/loading';
import { ErrorMessage } from '../message/error';
import { EmptyMessage } from '../message/empty';

interface ListingProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  renderItem: (item: T, index: number) => ReactNode;
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

  if (data.length === 0) {
    return <>{emptyComponent}</>;
  }

  return (
    <div className="record-listing">
      {data.map((item, index) => (
        <div key={index} className="record-item">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
