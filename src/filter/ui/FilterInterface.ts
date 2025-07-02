export default interface FilterInterface {
  loadOptions(): Promise<any>;
  getQueryField(): string;
  getKey(): string;
  getLabel(): string;
  getOptions(): any;
  getValue(): any;
  getActiveValue(): any;
  getType(): string;
  getIdParamName(): string;
  getLabelParamName(): string;
  getParentKey(): string;
  getParentIdParamName(): string;
  getParentLabelParamName(): string;
  getQueryFieldEntity(): string | null;
  getParentKeyEntity(): string | null;
}
