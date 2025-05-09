import Container from "./Container";

export default class ContainerFactory {
  // Properties
  private instance: Container | null = null;

  // Methods
  create(): Container {
    if (this.instance == null) {
      this.instance = new Container();
    }
    return this.instance;
  }
}
