type Edicao<T> = {
  success: boolean | null;
  rowExists: boolean | null;
  row: T;
}