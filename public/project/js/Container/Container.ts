import ContainerBase from "@public/global/js/Container/Base";

export default class Container extends ContainerBase {
  // Properties

  // Constructor
  constructor() {
    super();
    this.populateDependencies();
  }

  // Methods
  populateDependencies(): void {
    super.populateDependencies();
 
    this.insertDependency("rootUrl", process.env.PUBLIC_ROOT_URL);
    this.insertDependency("cdnUrl", process.env.PUBLIC_CDN_URL);
    
    this.insertDependency("displayOnField", false);
  }
}
