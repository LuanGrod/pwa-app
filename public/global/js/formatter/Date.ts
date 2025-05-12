class Date implements Formatter {
  constructor() {
  }

  format(value: any) {
    return new Intl.DateTimeFormat("pt-BR").format(new window.Date(value));
  }
}

export default Date;