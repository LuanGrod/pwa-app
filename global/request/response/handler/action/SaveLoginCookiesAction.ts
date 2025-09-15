import Cookie from "@global/cookie/handler/Handler";
import { LoginResponse } from "@global/type/request/Login";
import { ActionInterface } from "./ActionInterface";

export default class SaveLoginCookiesAction implements ActionInterface {
  // Properties
  private expirationMonths: number;

  // Constructor
  /**
   * @param expirationMonths - Number of months until cookies expire (default: 1)
   */
  constructor(expirationMonths: number = 1) {
    this.expirationMonths = expirationMonths;
  }

  // Methods
  handleSuccess: (result: any) => Promise<void> | void = async (result: LoginResponse) => {
    if (result.userNotFound) {
      return;
    }

    const { token, id } = result;
    
    if (!token || !id) {
      throw new Error("Token or ID missing from login response");
    }

    const cookie = new Cookie();
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + this.expirationMonths);

    // Save token and user ID in cookies
    cookie.setCookie("token", token, expirationDate);
    cookie.setCookie("id", id.toString(), expirationDate);
  };
}
