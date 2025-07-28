import { Form } from "./Form";
import { Email } from "./item/prebuilt/Email";
import { Hidden } from "./item/Hidden";
import { Link } from "./item/prebuilt/Link";
import { Senha } from "./item/prebuilt/Senha";

const formItems = [
  new Email({ entity: "estudantes", defaultValue: "mail@mail.com" }),
  new Senha({ entity: "estudantes", defaultValue: "Senha123!" }),
  new Hidden({ name: "remember_password", defaultValue: "1", fieldName: "remember_password" }),
  new Link({
    formName: "Esqueci a senha",
    data: new Map<string, any>([["href", "/recuperacao-senha"]]),
    widgetClassName: "link-recuperacao-senha",
  }),
];
const form = new Form(formItems, "below");

export default form;
