import { Form } from "./Form";
import { DataNascimento } from "./item/prebuilt/DataNascimento";
import { Email } from "./item/prebuilt/Email";
import { Whatsapp } from "./item/prebuilt/Whatsapp";

const formItems = [
  new Email({ entity: "estudantes" }),
  new Whatsapp({ entity: "estudantes" }),
  new DataNascimento({ entity: "estudantes" }),
];
const form = new Form(formItems, "below");

export default form;
