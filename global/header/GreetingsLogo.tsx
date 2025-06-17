import BaseHeader from "./Base";
import Greetings from "./item/Greetings";
import LogoOverlay from "./item/LogoOverlay";

type Props = {};

export default function GreetingsLogo({}: Props) {
  return <BaseHeader left={<Greetings />} right={<LogoOverlay />} />;
}
