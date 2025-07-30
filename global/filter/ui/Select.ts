import AbstractFilter from "./AbstractFilter";
import { Listing } from "@global/request/builder/api/Listing";
import FilterInterface, {
  ConditionalOperator,
  ConnectionOperator,
  SelectionMode,
  FilterType,
  DEFAULT_VALUES,
} from "./FilterInterface";
import { FilterFragment } from "../StringAssembler";

type SelectProps = {
  entity: string;
  label: string;
  queryField: string;
  idParamName: string;
  labelParamName?: string;
  parentKey?: string;
  parentIdParamName?: string;
  parentLabelParamName?: string;
  queryFieldEntity?: string;
  parentKeyEntity?: string;
  key?: string;
  conditionalOperator?: ConditionalOperator;
  connectionOperator?: ConnectionOperator;
  denialOperator?: boolean;
  parentConditionalOperator?: ConditionalOperator;
  parentConnectionOperator?: ConnectionOperator;
  parentDenialOperator?: boolean;
  selectionMode?: SelectionMode;
  labelFields?: string[];
  customOptionComponent?: string;
  hasClearFilter?: boolean;
  hasSearch?: boolean;
};

export default class Select extends AbstractFilter {
  options: string[];
  entity: string;
  idParamName: string;
  labelParamName: string;
  parentKey: string;
  parentIdParamName: string;
  parentLabelParamName: string;
  parentKeyEntity: string;
  parentConditionalOperator: ConditionalOperator;
  parentConnectionOperator: ConnectionOperator;
  parentDenialOperator: boolean;
  selectionMode: SelectionMode;
  labelFields: string[];
  customOptionComponent: string;
  hasClearFilter: boolean;
  hasSearch: boolean;

  constructor({
    entity,
    label,
    queryField,
    idParamName,
    labelParamName,
    parentKey,
    parentIdParamName,
    parentLabelParamName,
    queryFieldEntity,
    parentKeyEntity,
    key,
    conditionalOperator,
    connectionOperator,
    denialOperator,
    parentConditionalOperator,
    parentConnectionOperator,
    parentDenialOperator,
    selectionMode = SelectionMode.MULTI,
    labelFields,
    customOptionComponent,
    hasClearFilter = true,
    hasSearch = true,
  }: SelectProps) {
    super(
      queryField,
      label,
      FilterType.SELECT,
      conditionalOperator || DEFAULT_VALUES.SELECT_CONDITIONAL_OPERATOR,
      connectionOperator || DEFAULT_VALUES.CONNECTION_OPERATOR,
      denialOperator || DEFAULT_VALUES.DENIAL_OPERATOR,
      key,
      queryFieldEntity || ""
    );
    this.options = [];
    this.entity = entity;
    this.idParamName = idParamName;
    this.labelParamName = labelParamName || "";
    this.parentKey = parentKey || "";
    this.parentIdParamName = parentIdParamName || "";
    this.parentLabelParamName = parentLabelParamName || "";
    this.parentKeyEntity = parentKeyEntity || "";
    this.parentConditionalOperator = parentConditionalOperator || DEFAULT_VALUES.SELECT_CONDITIONAL_OPERATOR;
    this.parentConnectionOperator = parentConnectionOperator || DEFAULT_VALUES.CONNECTION_OPERATOR;
    this.parentDenialOperator = parentDenialOperator || DEFAULT_VALUES.DENIAL_OPERATOR;
    this.selectionMode = selectionMode;
    this.labelFields = labelFields || [];
    this.customOptionComponent = customOptionComponent || "";
    this.hasClearFilter = hasClearFilter;
    this.hasSearch = hasSearch;
  }

  async loadOptions() {
    const listing = new Listing({ entity: this.entity });
    const result = await listing.build(true);
    const data = result.data.rows || [];

    // Se tem parentKey, é uma estrutura pai-filho
    if (this.parentKey && this.parentIdParamName && this.parentLabelParamName) {
      const agrupado: string[] = Object.values(
        data.reduce((acc: any, item: any) => {
          const parentId = item[this.parentIdParamName];
          const parentLabel = item[this.parentLabelParamName];

          // Se o pai ainda não existe, cria
          if (!acc[parentId]) {
            acc[parentId] = {
              [this.parentIdParamName]: parentId,
              [this.parentLabelParamName]: parentLabel,
              children: [],
              isParent: true,
            };
          }

          // Adiciona o filho ao pai correspondente
          if (this.customOptionComponent) {
            // Se tem componente customizado, preserva todos os campos
            acc[parentId].children.push({
              ...item, // Preserva todos os campos da API
              isParent: false,
            });
          } else {
            // Comportamento padrão: apenas campos específicos
            acc[parentId].children.push({
              [this.idParamName]: item[this.idParamName],
              [this.labelParamName]: item[this.labelParamName],
              isParent: false,
            });
          }

          return acc;
        }, {})
      );

      this.options = agrupado;
    } else {
      // Estrutura simples, uma entidade apenas
      if (this.customOptionComponent) {
        // Se tem componente customizado, preserva todos os campos
        this.options = data.map((item: any) => ({
          ...item, // Preserva todos os campos da API
          isParent: false,
        }));
      } else {
        // Comportamento padrão: apenas campos específicos
        this.options = data.map((item: any) => ({
          [this.idParamName]: item[this.idParamName],
          [this.labelParamName]: item[this.labelParamName],
          isParent: false,
        }));
      }
    }
  }

  getOptions(): any {
    return this.options;
  }

  getInitialValue(): any {
    return [];
  }

  getSelectionMode(): SelectionMode {
    return this.selectionMode;
  }

  getIdParamName(): string {
    return this.idParamName;
  }

  getLabelParamName(): string {
    return this.labelParamName;
  }

  getParentKey(): string {
    return this.parentKey;
  }

  getParentIdParamName(): string {
    return this.parentIdParamName;
  }

  getParentLabelParamName(): string {
    return this.parentLabelParamName;
  }

  getParentKeyEntity(): string {
    return this.parentKeyEntity;
  }

  getParentConditionalOperator(): ConditionalOperator {
    return this.parentConditionalOperator;
  }

  getParentConnectionOperator(): ConnectionOperator {
    return this.parentConnectionOperator;
  }

  getParentDenialOperator(): boolean {
    return this.parentDenialOperator;
  }

  getLabelFields(): string[] {
    return this.labelFields;
  }

  getCustomOptionComponent(): string {
    return this.customOptionComponent;
  }

  getHasClearFilter(): boolean {
    return this.hasClearFilter;
  }

  getHasSearch(): boolean {
    return this.hasSearch;
  }

  getFilterFragment(values: Record<string, any>): FilterFragment[] {
    const fragments: FilterFragment[] = [];
    const queryFieldEntity = this.queryFieldEntity ? `${this.queryFieldEntity}_` : "";
    const parentKeyEntity = this.parentKeyEntity ? `${this.parentKeyEntity}_` : "";
    const keyFilteredValues =
      values[this.queryField] && values[this.queryField].length > 0 ? values[this.queryField] : [];
    const parentKeyFilteredValues =
      this.parentKey && values[this.parentKey] && values[this.parentKey].length > 0
        ? values[this.parentKey]
        : [];

    if (keyFilteredValues.length) {
      let currentFilter = `${queryFieldEntity}${this.queryField}_0{${
        this.conditionalOperator
      }}${keyFilteredValues.join(",")}`;
      currentFilter = this.denialOperator ? `!(${currentFilter})` : currentFilter;
      fragments.push({ value: currentFilter, connector: this.connectionOperator });
    }
    if (parentKeyFilteredValues.length) {
      let currentFilter = `${parentKeyEntity}${this.parentKey}_0{${
        this.parentConditionalOperator
      }}${parentKeyFilteredValues.join(",")}`;
      currentFilter = this.parentDenialOperator ? `!(${currentFilter})` : currentFilter;
      fragments.push({ value: currentFilter, connector: this.parentConnectionOperator });
    }
    return fragments;
  }
}
