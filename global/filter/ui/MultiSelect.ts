import AbstractFilter from "./AbstractFilter";
import { Listing } from "@global/request/builder/api/Listing";
import FilterInterface, { ConditionalOperator, ConnectionOperator } from "./FilterInterface";
import { FilterFragment } from "./FilterStringAssembler";

type MultiSelectProps = {
  entity: string;
  label: string;
  queryField: string;
  idParamName: string;
  labelParamName: string;
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
};

export default class MultiSelect extends AbstractFilter {
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
    conditionalOperator = "in",
    connectionOperator,
    denialOperator,
    parentConditionalOperator,
    parentConnectionOperator,
    parentDenialOperator,
  }: MultiSelectProps) {
    super(
      queryField,
      label,
      "multi-select",
      key,
      queryFieldEntity,
      conditionalOperator,
      connectionOperator,
      denialOperator
    );
    this.options = [];
    this.entity = entity;
    this.idParamName = idParamName;
    this.labelParamName = labelParamName;
    this.parentKey = parentKey || "";
    this.parentIdParamName = parentIdParamName || "";
    this.parentLabelParamName = parentLabelParamName || "";
    this.parentKeyEntity = parentKeyEntity || "";
    this.parentConditionalOperator = parentConditionalOperator || "in";
    this.parentConnectionOperator = parentConnectionOperator || "and";
    this.parentDenialOperator = parentDenialOperator || false;
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
          acc[parentId].children.push({
            [this.idParamName]: item[this.idParamName],
            [this.labelParamName]: item[this.labelParamName],
            isParent: false,
          });

          return acc;
        }, {})
      );

      this.options = agrupado;
    } else {
      // Estrutura simples, uma entidade apenas
      this.options = data.map((item: any) => ({
        [this.idParamName]: item[this.idParamName],
        [this.labelParamName]: item[this.labelParamName],
        isParent: false,
      }));
    }
  }

  getOptions(): any {
    return this.options;
  }

  getValue(): string[] {
    return [];
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

  getActiveValue(): string | null {
    throw new Error("Method not implemented.");
  }

  /**
   * Builds the filter fragments for this multi-select filter.
   * Returns an array of fragments (child and/or parent).
   */
  getFilterFragment(
    values: Record<string, any>
  ): FilterFragment[] {
    const fragments: FilterFragment[] = [];
    const queryFieldEntity = this.queryFieldEntity ? `${this.queryFieldEntity}_` : "";
    const parentKeyEntity = this.parentKeyEntity ? `${this.parentKeyEntity}_` : "";
    const keyFilteredValues = values[this.queryField] && values[this.queryField].length > 0 ? values[this.queryField] : [];
    const parentKeyFilteredValues = this.parentKey && values[this.parentKey] && values[this.parentKey].length > 0 ? values[this.parentKey] : [];

    if (keyFilteredValues.length) {
      let currentFilter = `${queryFieldEntity}${this.queryField}_0{${this.conditionalOperator}}${keyFilteredValues.join(",")}`;
      currentFilter = this.denialOperator ? `!(${currentFilter})` : currentFilter;
      fragments.push({ value: currentFilter, connector: this.connectionOperator });
    }
    if (parentKeyFilteredValues.length) {
      let currentFilter = `${parentKeyEntity}${this.parentKey}_0{${this.parentConditionalOperator}}${parentKeyFilteredValues.join(",")}`;
      currentFilter = this.parentDenialOperator ? `!(${currentFilter})` : currentFilter;
      fragments.push({ value: currentFilter, connector: this.parentConnectionOperator });
    }
    return fragments;
  }
}
