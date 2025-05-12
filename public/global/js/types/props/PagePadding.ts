/**
 * A ideia geral de definir essa propriedade é se o começo da página tem um espaçamento ou não, aqui só adiciona as classes,
 * o valor dos paddings primary, secondary e header são definidos por meio de variáveis css no arquivo
 * public/global/assets/styles/custom.css
 *
 * no-padding: quando o começo da página ignora o header e que fica fixo no topo da página (top: 0)
 *
 * primary-padding: quando o começo da página tem um espaçamento primário, o valor base é referente ao header + um valor maior
 *
 * secondary-padding: quando o começo da página tem um espaçamento secundário, o valor base é referente ao header + um valor menor
 *
 * header-padding: quando o começo da página tem um espaçamento do tamanho do header, é esperado que ele fique colado no header, como nos casos de páginas que tem sections hero ou banners 
 */
type PagePadding = "no-padding" | "primary-padding" | "secondary-padding" | "header-padding";
