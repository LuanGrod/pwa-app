import ProvaFilterItem from "./ProvaFilterItem";
import HistoricoFilterItem from "./HistoricoFilterItem";
import AreaFilterItem from "./AreaFilterItem";

// Registry de componentes customizados de filtro
export const customFilterComponents = {
  "HistoricoFilterItem": HistoricoFilterItem,
  "ProvaFilterItem": ProvaFilterItem,
  "AreaFilterItem": AreaFilterItem
};

// Função helper para obter o componente correto
export function getFilterComponent(componentName?: string) {
  if (!componentName) {
    return null;
  }

  return customFilterComponents[componentName as keyof typeof customFilterComponents] || null;
} 