import { useState, useEffect, Dispatch, SetStateAction } from "react";

type RequestBuilder = {
  build(needsAuthorization: boolean): Promise<any>;
};

type RequestBuilderConstructor<T extends RequestBuilder> = new (props: any) => T;

type UseApiRequestProps<TData, TBuilder extends RequestBuilder> = {
  builderClass: RequestBuilderConstructor<TBuilder>;
  builderProps: any;
  needsAuthorization?: boolean;
  initialData: TData;
  dependencies?: any[];
  shouldFetch?: boolean;
};

type UseApiRequestReturn<TData> = {
  data: TData;
  setData: Dispatch<SetStateAction<TData>>;
  loading: boolean;
  error?: string;
  refetch: () => Promise<void>;
};

/**
 * Hook base genérico para gerenciar estado e lifecycle de qualquer request API
 * 
 * @param builderClass - Classe do builder de request (GetRow, Listing, etc.)
 * @param builderProps - Props para o construtor do builder
 * @param needsAuthorization - Se o request necessita autorização
 * @param initialData - Valor inicial para o estado data
 * @param dependencies - Array de dependências para o useEffect
 * @param shouldFetch - booleano que indica se a requisição deve ser feita (vide useGetRow)
 * @returns Estado e funções para gerenciar o request
 */
export function useApiRequest<TData, TBuilder extends RequestBuilder>({
  builderClass,
  builderProps,
  needsAuthorization = false,
  initialData,
  dependencies = [],
  shouldFetch = true,
}: UseApiRequestProps<TData, TBuilder>): UseApiRequestReturn<TData> {
  const [data, setData] = useState<TData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchData = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const builder = new builderClass(builderProps);
      
      const result = await builder.build(needsAuthorization);

      if (!result.success) {
        setError(result.message[0]);
        return;
      }

      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    setData,
    loading,
    error,
    refetch: fetchData,
  };
}
