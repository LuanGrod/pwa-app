import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { MaxLengthValidatorFactory } from "@/validator/string/maxLength/MaxLengthValidatorFactory";
import { Form } from "./Form";
import { DataNascimento } from "./item/prebuilt/DataNascimento";
import { Email } from "./item/prebuilt/Email";
import { Whatsapp } from "./item/prebuilt/Whatsapp";
import { Text } from "./item/Text";
import Item from "@/component/form/item/item/Item";
import InputWidget from "@/component/form/item/widgets/Input";

const formItems = [
  new Email({ entity: "estudantes" }),
  new Whatsapp({ entity: "estudantes" }),
  new DataNascimento({ entity: "estudantes" }),
];
const form = new Form(formItems, "below");

export default form;
