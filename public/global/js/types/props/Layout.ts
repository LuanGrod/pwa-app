/**
 * As propriedades que todos os Layouts dos projetos devem ter.
 *
 * Note que o pagePadding pode receber além de um valor fixo do tipo PagePadding, uma string qualquer referente a uma classe custom especifica do projeto
 */
type Layout = {
  title: string;
  pagePadding?: PagePadding | string;
  customClassBody?: string;
  customClassWrapper?: string;
  customClassApp?: string;
  customClassContent?: string;
  customClassContentWrapper?: string;
};
