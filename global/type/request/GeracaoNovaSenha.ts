export type GeracaoNovaSenhaResponse = {
  userNotFound: boolean;
  id: number;
  token: string;
  msg: Msg;
};

type Msg = {
  [key: string]: string[];
};