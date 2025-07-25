export type UpdateResponse<T> = {
  success: boolean;
  row: T;
  rowExists: boolean;
  msg: string;
};
