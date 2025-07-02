import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { MaxLengthValidatorFactory } from "@/validator/string/maxLength/MaxLengthValidatorFactory";
import { Form } from "./Form";
import { Item } from "./item/AbstractItem";
import { DataNascimento } from "./item/prebuilt/DataNascimento";
import { Email } from "./item/prebuilt/Email";
import { Whatsapp } from "./item/prebuilt/Whatsapp";

const formItems = [
  new Email({ entity: "estudantes" }),
  new Whatsapp({ entity: "estudantes" }),
  new Item({
    name: "objetivo de especialidade",
    entity: "estudantes",
    validators: [MaxLengthValidatorFactory.create(200)],
  }),
  new DataNascimento({ entity: "estudantes" }),
];
const form = new Form(formItems, "below");

export default form;
