export default class ParamBuilder {
  // Properties

  // Constructor
  constructor() {}

  // Methods
  public build(params: Record<string, any>) {
    const esc = encodeURIComponent;
    return Object.entries(params)
      .map(([k, v]) => `${esc(k)}=${esc(v)}`)
      .join("&");
  }
}
