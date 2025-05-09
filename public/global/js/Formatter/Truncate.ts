class Truncate implements Formatter {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  setSize(size: number) {
    this.size = size;
  }

  format(value: any) {
    return value.length > this.size ? value.substring(0, this.size) + "..." : value;
  }
}

export default Truncate;
