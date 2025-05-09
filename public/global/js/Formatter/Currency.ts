class Currency implements Formatter {
  constructor() {
  }

  format(value: any) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
}

export default Currency;
