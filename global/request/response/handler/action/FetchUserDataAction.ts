import { GetRow } from "@global/request/builder/GetRow";
import { LoginResponse } from "@global/type/request/response/handler/actions/Login";
import { ActionInterface } from "./ActionInterface";

export default class FetchUserDataAction implements ActionInterface {
  // Properties
  private entity: string;
  private params: Array<[string, string]>;
  private setUser: (user: any) => void;

  // Constructor
  /**
   * @param entity - The entity to fetch user data from
   * @param params - Array of [finalKey, responseKey] pairs for mapping response data
   * @param setUser - Function to set user data in store
   */
  constructor(
    entity: string,
    params: Array<[string, string]>,
    setUser: (user: any) => void
  ) {
    this.entity = entity;
    this.params = params;
    this.setUser = setUser;
  }

  // Methods
  handleSuccess: (result: any) => Promise<void> | void = async (result: LoginResponse) => {
    // Skip if user not found
    if (result.userNotFound) {
      return;
    }

    const { id } = result;
    
    if (!id) {
      throw new Error("User ID missing from login response");
    }

    if (!this.entity || !this.params || !this.setUser) {
      throw new Error("Missing required parameters for fetching user data");
    }

    // Fetch user data
    const getRow = new GetRow({
      entity: this.entity,
      id: String(id),
    });

    const response = await getRow.build(true);

    // Map response data according to params configuration
    const usuario = this.params.reduce(
      (acc: Record<string, any>, [finalKey, responseKey]: [string, string]) => {
        acc[finalKey] = response.data[responseKey];
        return acc;
      },
      {}
    );

    // Update user store
    this.setUser(usuario);
  };
}
