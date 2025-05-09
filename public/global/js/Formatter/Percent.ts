class Percent implements Formatter {
  decimalPoints: number;

  constructor(decimalPoints: number) {
    this.decimalPoints = decimalPoints;
  }

  setDecimalPoints(decimalPoints: number) {
    this.decimalPoints = decimalPoints;
  }

  format(value: any) {
    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: this.decimalPoints,
    }).format(value);
  }
}

export default Percent;
