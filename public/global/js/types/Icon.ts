/**
 * @param changeOnTheme: se o icone vai mudar de cor dependendo do tema (dark -> white | light -> black)
 * @param color: a cor do icone (se changeOnTheme for definido vai ignorar essa propriedade)
 * 
 */
export type Icon = {
  size: number;
  color?: string;
  className?: string;
  changeOnTheme?: boolean;
};
