import FetchUserDataAction from "@global/request/response/handler/action/FetchUserDataAction";
import RedirectAction from "@global/request/response/handler/action/RedirectAction";
import SaveLoginCookiesAction from "@global/request/response/handler/action/SaveLoginCookiesAction";
import { GeracaoNovaSenhaHandler } from "../GeracaoNovaSenhaHandler";
import { GeracaoNovaSenha as GeracaoNovaSenhaResponseHandler } from "@global/request/response/handler/api/GeracaoNovaSenha";

export default class GeracaoNovaSenhaHandlerFactory {
  // Properties

  // Constructor

  // Methods
  static create(entity: string, router: any): GeracaoNovaSenhaHandler {
    return new GeracaoNovaSenhaHandler({
      entity,
      responseHandler: new GeracaoNovaSenhaResponseHandler({
        onSuccessActions: [
          new SaveLoginCookiesAction(),
          new RedirectAction(router)
        ]
      })
    });
  }
}
