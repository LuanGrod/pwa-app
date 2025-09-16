import { useEffect, useState } from "react";

type Props<T> = {
  options: T[];
  keyParams: string[];
  caseSensitive?: boolean;
  childrenProperty?: string;
};

/**
 * Hook para busca em listas de objetos.
 * @param options Lista de objetos a serem filtrados.
 * @param keyParams Campos dos objetos onde a busca será realizada.
 * @param caseSensitive Define se a busca é sensível a maiúsculas/minúsculas. Padrão é false.
 * @param childrenProperty (opcional) Nome da propriedade que contém filhos (para buscas em estruturas hierárquicas).
 * @returns filteredData - Lista filtrada com base no termo de busca.
 * @returns searchTerm - Termo de busca atual.
 * @returns setSearchTerm - Função para atualizar o termo de busca.
 * @returns setFilteredData - Função para atualizar manualmente os dados filtrados (se necessário).
 */
export default function useSearch<T = any>({
  options,
  keyParams,
  caseSensitive = false,
  childrenProperty,
}: Props<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(options);

  const searchInObject = (obj: any, term: string): boolean => {
    if (!term.trim()) return true;

    const searchValue = caseSensitive ? term : term.toLowerCase();

    return keyParams.some((param) => {
      const value = obj[param];
      if (!value) return false;

      const objValue = caseSensitive ? value : value.toLowerCase();
      return objValue.includes(searchValue);
    });
  };

  const filterData = (data: any[], term: string) => {
    if (!term.trim()) return data;

    return data.filter((item: any) => {
      const hasChildren =
        childrenProperty &&
        item[childrenProperty] &&
        Array.isArray(item[childrenProperty]) &&
        item[childrenProperty].length > 0;

      if (hasChildren) {
        const parentMatch = searchInObject(item, term);

        const childMatch = item[childrenProperty].some((child: any) =>
          searchInObject(child, term)
        );

        return parentMatch || childMatch;
      }

      return searchInObject(item, term);
    });
  };

  useEffect(() => {
    const filtered = filterData(options, searchTerm);
    setFilteredData(filtered);
  }, [options, searchTerm]);

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    setFilteredData,
  };
}
