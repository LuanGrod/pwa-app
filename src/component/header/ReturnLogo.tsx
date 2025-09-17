import BaseHeader from "@global/component/header/Base";
import ReturnRoute from "@global/component/header/item/ReturnRoute";
import LogoOverlay from "@/component/header/item/LogoOverlay";
import Placeholder from "@global/component/header/item/Placeholder";


type Props = {};

export default function ReturnLogo({}: Props) {
  return <BaseHeader left={<ReturnRoute />} center={<LogoOverlay />} right={<Placeholder />} />;
}
