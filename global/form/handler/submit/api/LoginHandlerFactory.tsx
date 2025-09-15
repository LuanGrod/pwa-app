import FetchUserDataAction from "@global/request/response/handler/action/FetchUserDataAction";
import RedirectAction from "@global/request/response/handler/action/RedirectAction";
import SaveLoginCookiesAction from "@global/request/response/handler/action/SaveLoginCookiesAction";
import { LoginHandler } from "../LoginHandler";
import { Login as LoginResponseHandler } from "@global/request/response/handler/api/Login";

export default class LoginHandlerFactory {
  // Properties

  // Constructor

  // Methods
  static create(entity: string, params: Array<[string, string]>, setUser: (user: any) => void, router: any): LoginHandler {
    return new LoginHandler({
      responseHandler: new LoginResponseHandler({
        onSuccessActions: [
          new SaveLoginCookiesAction(),
          new FetchUserDataAction(entity, params, setUser),
          new RedirectAction(router)
        ]
      })
    });
  }
}
