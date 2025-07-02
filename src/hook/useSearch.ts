import { useEffect, useState } from "react";

type Props<T> = {
  options: T[];
  keyParams: string[];
  caseSensitive?: boolean;
};

export default function useSearch<T = any>({ options, keyParams, caseSensitive = false }: Props<T>) {
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
      // Verifica se é um item hierárquico (tem children)
      if (item.isParent && item.children && Array.isArray(item.children)) {
        // Busca no parent
        const parentMatch = searchInObject(item, term);

        // Busca nos children
        const childMatch = item.children.some((child: any) => searchInObject(child, term));

        return parentMatch || childMatch;
      }

      // Para itens simples, busca diretamente nos keyParams
      return searchInObject(item, term);
    });
  };

  useEffect(() => {
    if(options && options.length !== 0) {
      const filtered = filterData(options, searchTerm);
      setFilteredData(filtered);
    }
  }, [options, searchTerm]);

  // Função auxiliar para uso externo (mantém compatibilidade)
  const filterOptions = (data: any[], term: string) => filterData(data, term);

  return { 
    filteredData, 
    searchTerm, 
    setSearchTerm,
    filterOptions // Para compatibilidade com código existente
  };
}
