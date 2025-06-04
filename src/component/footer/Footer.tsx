import Bandeira from "@global/icons/Bandeira";
import Casa from "@global/icons/Casa";
import Grafico from "@global/icons/Grafico";
import styles from "./Footer.module.css";
import FooterLinkWithIcon from "./LinkWithIcon";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className={styles.container}>
      <FooterLinkWithIcon href="/" icon={<Casa size={30} />} label="Início" />
      <FooterLinkWithIcon href="/estatisticas" icon={<Grafico size={30} />} label="Estatísticas" />
      {/* <FooterLinkWithIcon href="/conquistas" icon={<Foguete size={30} />} label="Conquistas" /> */}
      <FooterLinkWithIcon href="/salvos" icon={<Bandeira size={30} />} label="Salvos" />
    </footer>
  );
}
