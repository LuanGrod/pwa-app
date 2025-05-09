import type ContainerBaseInterface from "./BaseInterface";

export default class ContainerBase implements ContainerBaseInterface {
  // Properties
  dependencies = <any>[];

  // Constructor

  populateDependencies(): void {
    this.dependencies["ufs"] = {
      AC: "Acre",
      AL: "Alagoas",
      AM: "Amazonas",
      AP: "Amapá",
      BA: "Bahia",
      CE: "Ceará",
      DF: "Distrito Federal",
      ES: "Espírito Santo",
      GO: "Goiás",
      MA: "Maranhão",
      MG: "Minas Gerais",
      MS: "Mato Grosso do Sul",
      MT: "Mato Grosso",
      PA: "Pará",
      PB: "Paraíba",
      PE: "Pernambuco",
      PI: "Piauí",
      PR: "Paraná",
      RJ: "Rio de Janeiro",
      RN: "Rio Grande do Norte",
      RO: "Rondônia",
      RR: "Roraima",
      RS: "Rio Grande do Sul",
      SC: "Santa Catarina",
      SE: "Sergipe",
      SP: "São Paulo",
      TO: "Tocantins",
    };
  }

  // Methods
  getDependency(name: string): any {
    return this.dependencies[name];
  }

  insertDependency(name: string, value: any): void {
    this.dependencies[name] = value;
  }

  clear(): void {
    this.dependencies = [];
  }
}
