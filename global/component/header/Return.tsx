import ReturnRoute from "./item/ReturnRoute";
import BaseHeader from "./Base";
import Placeholder from "./item/Placeholder";

type Props = {};

export default function Return({}: Props) {
  return <BaseHeader left={<ReturnRoute />} center={<Placeholder />} right={<Placeholder />} />;
}
