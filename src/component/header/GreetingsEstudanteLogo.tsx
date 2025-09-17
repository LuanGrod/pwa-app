import BaseHeader from "@global/component/header/Base";
import LogoOverlay from "@/component/header/item/LogoOverlay";
import GreetingsEstudante from "@/component/header/item/GreetingsEstudante";

type Props = {};

export default function GreetingsEstudanteLogo({}: Props) {
  return <BaseHeader left={<GreetingsEstudante />} right={<LogoOverlay />} />;
}
