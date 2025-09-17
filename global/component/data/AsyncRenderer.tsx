"use client";

import React, { Fragment, ReactNode } from "react";
import { EmptyMessage } from "@global/component/data/message/empty";
import { ErrorMessage } from "@global/component/data/message/error";
import { LoadingMessage } from "@global/component/data/message/loading";

type AsyncRendererProps<T> = {
  data?: T | T[];
  loading: boolean;
  error?: string;
  renderItem: (item: T) => ReactNode;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
}

/**
 * Componente para renderização de dados assíncronos com gerenciamento de estados.
 * Lida automaticamente com estados de loading, error e empty.
 * Detecta automaticamente se os dados são um item único ou uma lista.
 * 
 * @param data - Item único (T) ou lista (T[]) para renderizar
 * @param loading - Estado de carregamento
 * @param error - Mensagem de erro opcional
 * @param renderItem - Função para renderizar cada item
 * @param loadingComponent - Componente customizado para loading
 * @param emptyComponent - Componente customizado para estado vazio
 * @param errorComponent - Componente customizado para erro
 */
export function AsyncRenderer<T>({
  data,
  loading,
  error,
  renderItem,
  loadingComponent = <LoadingMessage />,
  emptyComponent = <EmptyMessage />,
  errorComponent = error ? <ErrorMessage error={error} /> : null,
}: AsyncRendererProps<T>) {
  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return <>{errorComponent}</>;
  }

  const isEmpty = Array.isArray(data)
    ? !data || data.length === 0
    : !data;

  if (isEmpty) {
    return <>{emptyComponent}</>;
  }

  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, index) => (
          <Fragment key={index}>{renderItem(item)}</Fragment>
        ))}
      </>
    );
  }

  return renderItem(data as T);
}