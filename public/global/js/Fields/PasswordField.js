import BaseField from './BaseField';
import InputPassword from "@/app/components/global/forms/InputPassword"

export default class PasswordField extends BaseField {
  constructor(config = {}) {
    super({
      type: 'password',
      label: 'Senha',
      placeholder: 'Sua senha',
      component: InputPassword,
      ...config,
    });
  }
}
