import AbstractFilter from "./AbstractFilter";
import { Listing } from "@global/request/builder/api/Listing";
import { Listing as ListingResponseHandler } from "@global/request/response/handler/api/Listing";
import { FilterFragment } from "../StringAssembler";
import { ComponentType } from "react";
import { ConditionalOperator } from "@global/type/filter/ConditionalOpeator";
import { ConnectionOperator } from "@global/type/filter/ConnectionOperator";
import { SelectionMode } from "@global/type/filter/SelectionMode";
import { DEFAULT_FILTER_VALUES } from "@global/constants/filter/ui/Values";

type SelectProps = {
  /**
   * Entity used in the request
   */
  entity: string;
  /**
   * Label used in the button
   */
  label: string;
  /**
   * Field used in the filter query
   * @example "?filters=questoes_id_tema_0{eq}2" => "id_tema"
   */
  queryField: string;
  /**
   * Name of the parameter from the API response with the id of the option
   */
  idParamName: string;
  /**
   * Name of the parameter from the API response with the label of the option (this won't be used if labelFields is provided)
   */
  labelParamName?: string;
  /**
   * Parent field used in the filter query
   * @example "?filters=temas_id_area_0{eq}2" => "id_area"
   */
  parentKey?: string;
  /**
   * Name of the parameter from the API response with the id of the parent option
   */
  parentIdParamName?: string;
  /**
   * Name of the parameter from the API response with the label of the parent option
   */
  parentLabelParamName?: string;
  /**
   * Parent entity used in the filter query
   * @example "?filters=temas_id_area_0{eq}2" => "temas"
   */
  parentKeyEntity?: string;
  /**
   * Entity used in the filter query
   * @example "?filters=questoes_id_tema_0{eq}2" => "questoes"
   */
  queryFieldEntity?: string;
  /**
   * Key of the filter
   * @default queryField
   */
  key?: string;
  /**
   * Conditional operator used in the filter query
   * @default "in"
   */
  conditionalOperator?: ConditionalOperator;
  /**
   * Connection operator used in the filter query
   * @default "and"
   */
  connectionOperator?: ConnectionOperator;
  /**
   * Denial operator used in the filter query
   * @default false
   */
  denialOperator?: boolean;
  /**
   * Conditional operator used in the filter query for the parent option
   * @default "in"
   */
  parentConditionalOperator?: ConditionalOperator;
  /**
   * Connection operator used in the filter query for the parent option
   * @default "and"
   */
  parentConnectionOperator?: ConnectionOperator;
  /**
   * Denial operator used in the filter query for the parent option
   * @default false
   */
  parentDenialOperator?: boolean;
  /**
   * Array of names of the parameters from the API response to be used in the custom option component (when you use this, the component won't use the value from labelParamName)
   */
  labelFields?: string[];
  /**
   * Custom option component (when you need more than just the default label)
   */
  customOptionComponent?: ComponentType<any>;
  /**
   * Whether the filter has a clear filter button
   * @default true
   */
  hasClearFilter?: boolean;
  /**
   * Whether the filter has a search input
   * @default true
   */
  hasSearch?: boolean;
  /**
   * Selection mode used in the filter
   * @default "multi"
   */
  selectionMode?: SelectionMode;
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
  customOptionComponent: ComponentType<any> | null;
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
    selectionMode = "multi",
    labelFields,
    customOptionComponent,
    hasClearFilter = true,
    hasSearch = true,
  }: SelectProps) {
    super(
      queryField,
      label,
      "select",
      conditionalOperator ||
        (DEFAULT_FILTER_VALUES.SELECT_CONDITIONAL_OPERATOR as ConditionalOperator),
      connectionOperator || (DEFAULT_FILTER_VALUES.CONNECTION_OPERATOR as ConnectionOperator),
      denialOperator || (DEFAULT_FILTER_VALUES.DENIAL_OPERATOR as boolean),
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
    this.parentConditionalOperator =
      parentConditionalOperator ||
      (DEFAULT_FILTER_VALUES.SELECT_CONDITIONAL_OPERATOR as ConditionalOperator);
    this.parentConnectionOperator =
      parentConnectionOperator ||
      (DEFAULT_FILTER_VALUES.CONNECTION_OPERATOR as ConnectionOperator);
    this.parentDenialOperator =
      parentDenialOperator || (DEFAULT_FILTER_VALUES.DENIAL_OPERATOR as boolean);
    this.selectionMode = selectionMode;
    this.labelFields = labelFields || [];
    this.customOptionComponent = customOptionComponent || null;
    this.hasClearFilter = hasClearFilter;
    this.hasSearch = hasSearch;
  }

  async loadOptions() {
    const listing = new Listing({
      entity: this.entity,
      responseHandler: new ListingResponseHandler({}),
    });
    const result = await listing.build(true);
    const data = result.data.rows || [];

    // Se tem parentKey, é uma estrutura pai-filho
    if (this.parentKey && this.parentIdParamName && this.parentLabelParamName) {
      const agrupado: string[] = Object.values(
        data.reduce((acc: any, item: any) => {
          const parentId = item[this.parentIdParamName];
          const parentLabel = item[this.parentLabelParamName];

          // Se o pai ainda não existe, cria preservando todos os campos disponíveis
          if (!acc[parentId]) {
            acc[parentId] = {
              ...item, // Preserva todos os campos do primeiro item como base para o pai
              [this.parentIdParamName]: parentId,
              [this.parentLabelParamName]: parentLabel,
              children: [],
              isParent: true,
            };
          }

          // Adiciona o filho ao pai correspondente - sempre preserva todos os campos
          acc[parentId].children.push({
            ...item, // Preserva todos os campos da API
            isParent: false,
          });

          return acc;
        }, {})
      );

      this.options = agrupado;
    } else {
      // Estrutura simples, uma entidade apenas - sempre preserva todos os campos
      this.options = data.map((item: any) => ({
        ...item, // Preserva todos os campos da API
        isParent: false,
      }));
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

  getCustomOptionComponent(): ComponentType<any> | null {
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
