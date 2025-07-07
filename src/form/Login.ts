import { Form } from "./Form";
import { Email } from "./item/prebuilt/Email";
import { Hidden } from "./item/prebuilt/Hidden";
import { Senha } from "./item/prebuilt/Senha";

const formItems = [
  new Email({ entity: "estudantes", defaultValue: "mail@mail.com" }),
  new Senha({ entity: "estudantes", defaultValue: "Senha123!" }),
  new Hidden({ entity: "estudantes", name: "lembrar_senha", defaultValue: "1" }),
];
const form = new Form(formItems, "below");

export default form;
