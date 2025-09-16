import { Form } from "@global/form/Form";
import { Hidden } from "@global/form/item/Hidden";
import { Senha } from "@global/form/item/prebuilt/Senha";
import { Link } from "@global/form/item/prebuilt/Link";
import { Email } from "@global/form/item/prebuilt/Email";

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
