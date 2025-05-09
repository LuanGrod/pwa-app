import { NotEmpty } from '../Validator/NotEmpty/NotEmpty';
import { Email } from '../Validator/String/Email/Email';
import BaseField from './BaseField';
import Input from "@/app/components/global/forms/Input"

export default class EmailField extends BaseField {

  constructor(config = {}) {
    super({
      type: 'email',
      label: 'E-mail',
      placeholder: 'Seu e-mail',
      component: Input,
      ...config
    });
    this.validators = [new Email("Message"), new NotEmpty("Message")]
  }
}
