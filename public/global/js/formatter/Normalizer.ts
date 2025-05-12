class Normalizer implements Formatter {
  private separator: string;

  constructor(separator: string = "_") {
    if (!["_", "-", ""].includes(separator)) {
      throw new Error("Separator must be '_', '-' or ''");
    }
    this.separator = separator;
  }

  format(value: any): string {
    let formatted = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    formatted = formatted.replace(/ç/g, "c");

    formatted = formatted.replace(/[!"#%()*+,.\/:;<=>?[\]^`{|}~]/g, "");

    formatted = formatted.toLowerCase();

    formatted = formatted.replace(/\s+/g, this.separator);

    // '-' or '_'
    if(this.separator) {
      formatted = formatted.replace(new RegExp(`^${this.separator}+|${this.separator}+$`, "g"), "");
    } 
    // ''
    else {
      formatted = formatted.replace(/[-_]/g, "");
    }

    return formatted;
  }
}

export default Normalizer;
