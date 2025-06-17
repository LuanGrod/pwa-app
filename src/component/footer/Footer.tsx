import BaseFooter from "@global/footer/Base";
import Bandeira from "@global/icons/Bandeira";
import Casa from "@global/icons/Casa";
import Grafico from "@global/icons/Grafico";

type Props = {};

export default function Footer({}: Props) {
  return (
    <BaseFooter
      links={[
        {
          href: "/",
          icon: <Casa size={30} />,
          label: "Início",
        },
        {
          href: "/estatisticas",
          icon: <Grafico size={30} />,
          label: "Estatísticas",
        },
        {
          href: "/salvos",
          icon: <Bandeira size={30} />,
          label: "Salvos",
        },
      ]}
    />
  );
}
