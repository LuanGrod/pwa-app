import AbstractFilter from "./AbstractFilter";
import { Listing } from "@request/builder/Listing";

export default class MultiSelect extends AbstractFilter {
  options: string[];
  entity: string;
  idParamName: string;
  labelParamName: string;
  parentKey: string;
  parentIdParamName: string;
  parentLabelParamName: string;

  constructor(
    entity: string,
    label: string,
    queryField: string,
    idParamName: string,
    labelParamName: string,
    parentKey?: string,
    parentIdParamName?: string,
    parentLabelParamName?: string,
    key?: string
  ) {
    super(queryField, label, "multi-select", key);
    this.options = [];
    this.entity = entity;
    this.idParamName = idParamName;
    this.labelParamName = labelParamName;
    this.parentKey = parentKey || "";
    this.parentIdParamName = parentIdParamName || "";
    this.parentLabelParamName = parentLabelParamName || "";
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
}
