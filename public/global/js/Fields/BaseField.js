export default class BaseField {
  constructor(config = {}) {
    this.name = config.name || '';
    this.label = config.label || '';
    this.placeholder = config.placeholder || '';
    this.required = config.required !== false;
    this.component = config.component || Input;
    this.type = config.type || 'text';
    this.customProps = config.customProps || {};
  }

  get fieldProps() {
    return {
      name: this.name,
      label: this.label,
      placeholder: this.placeholder,
      type: this.type,
      required: this.required,
      ...this.customProps
    };
  }

  render(extraprops = {}) {
    const Component = this.component;
    return <Component {...this.fieldProps} {...extraprops} />;
  }
}
