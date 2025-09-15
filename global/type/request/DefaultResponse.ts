export type DefaultResponse<T = any> = {
  success: boolean;
  messageType?: "success" | "error";
  message?: string;
  data: T;
};
