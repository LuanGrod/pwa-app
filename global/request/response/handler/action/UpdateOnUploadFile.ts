import { Update } from "@global/request/builder/api/Update";
import { ActionInterface } from "./ActionInterface";

export default class UpdateOnUploadFile implements ActionInterface {
  // Properties
  entity: string;
  field: string;
  data: any;
  setData: (data: any) => void;
  updateUrlImagem: (url: string) => void;

  // Constructor
  /**
   * @param entity - The entity to update.
   * @param field - The field to update.
   * @param data - The data to update.
   * @param setData - The function to set the data.
   * @param updateUrlImagem - The function to update the url image (usually a method from the user store that updates the url image).
   */
  constructor(
    entity: string,
    field: string,
    data: any,
    setData: (data: any) => void,
    updateUrlImagem: (url: string) => void
  ) {
    this.entity = entity;
    this.field = field;
    this.data = data;
    this.setData = setData;
    this.updateUrlImagem = updateUrlImagem;
  }

  // Methods
  handleSuccess: (result: any) => Promise<void> | void = async (result: any) => {
    const fileName = result.filesNames[0];
    if (fileName) {
      const requestBody = { [`${this.field}`]: fileName };

      const update = new Update({
        entity: this.entity,
        body: requestBody,
      });

      await update.build(true);

      this.setData({ ...this.data, [`${this.field}`]: fileName });
      this.updateUrlImagem(fileName);
    }
  };
}
