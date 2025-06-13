import Bandeira from "@global/icons/Bandeira";
import Casa from "@global/icons/Casa";
import Grafico from "@global/icons/Grafico";
import IconLink from "./IconLink";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="footer-wrapper">
      <IconLink href="/" icon={<Casa size={30} />} label="Início" />
      <IconLink href="/estatisticas" icon={<Grafico size={30} />} label="Estatísticas" />
      {/* <IconLink href="/conquistas" icon={<Foguete size={30} />} label="Conquistas" /> */}
      <IconLink href="/salvos" icon={<Bandeira size={30} />} label="Salvos" />
    </footer>
  );
}
