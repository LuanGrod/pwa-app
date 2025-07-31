import SimpleFilterItem from "@global/component/overlay/drawer/filter/SimpleFilterItem";
import ProvaFilterItem from "./ProvaFilterItem";
import HistoricoFilterItem from "./HistoricoFilterItem";

// Registry de componentes customizados de filtro
export const customFilterComponents = {
  "HistoricoFilterItem": HistoricoFilterItem,
  "ProvaFilterItem": ProvaFilterItem,
  "DefaultFilterItem": SimpleFilterItem,
};

// Função helper para obter o componente correto
export function getFilterComponent(componentName?: string) {
  if (!componentName) {
    return SimpleFilterItem;
  }

  return customFilterComponents[componentName as keyof typeof customFilterComponents] || SimpleFilterItem;
} 