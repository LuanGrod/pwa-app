type Link = {
  url: string; // ele vai bater a rota ativa com o link
  target?: Target;
  label?: string; // Label opcional
  iconClass?: string; // Ícone opcional
  submenu?: Link[]; // Submenus filhos
  title?: boolean; // Se é um título de sublink ou não
  submenuType?: Submenu;
  submenuSize?: SubmenuSize; // Tamanho da coluna
};
