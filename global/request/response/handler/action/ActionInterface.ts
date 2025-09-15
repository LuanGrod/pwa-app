export interface ActionInterface {
  handleSuccess: (result: any) => Promise<void> | void;
}