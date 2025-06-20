export default interface FilterInterface {
  loadOptions(): Promise<any>;
  getKey(): string;
  getLabel(): string;
  getOptions(): any;
  getValue(): any;
  getType(): string;
  getIdParamName(): string;
  getLabelParamName(): string;
  getParentKey(): string;
  getParentIdParamName(): string;
  getParentLabelParamName(): string;
}
