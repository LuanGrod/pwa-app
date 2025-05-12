import Normalizer from "./Normalizer";

class Slug implements Formatter {
  constructor() {}

  format(value: any) {
    const normalizer = new Normalizer("-");

    let slug = normalizer.format(value);

    return slug;
  }
}

export default Slug;
