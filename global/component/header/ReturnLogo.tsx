import BaseHeader from "./Base";
import LogoOverlay from "./item/LogoOverlay";
import ReturnRoute from "./item/ReturnRoute";
import Spacing from "./item/Spacing";

type Props = {};

export default function ReturnLogo({}: Props) {
  return <BaseHeader left={<ReturnRoute />} center={<LogoOverlay />} right={<Spacing />} />;
}
