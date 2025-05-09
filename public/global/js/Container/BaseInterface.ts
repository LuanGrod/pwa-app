export default interface ContainerBaseInterface {
  // Properties
  dependencies: [name: string, value: any][];

  // Methods
  populateDependencies: () => void;
  getDependency: (name: string) => any;
  insertDependency: (name: string, value: any) => void;
  clear: () => void;
}