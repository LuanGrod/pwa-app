import ReturnRoute from "./item/ReturnRoute";
import BaseHeader from "./Base";
import Spacing from "./item/Spacing";

type Props = {};

export default function Return({}: Props) {
  return <BaseHeader left={<ReturnRoute />} center={<Spacing />} right={<Spacing />} />;
}
