import Normalizer from "./Normalizer";

class FieldName implements Formatter {
  constructor() {}

  format(value: any) {
    const normalizer = new Normalizer("_");

    let fieldName = normalizer.format(value);

    return fieldName;
  }
}

export default FieldName;
