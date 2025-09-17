import ReturnRoute from "./item/ReturnRoute";
import BaseHeader from "./Base";
import Placeholder from "./item/Placeholder";

type Props = {
  title: string;
};

export default function ReturnTitle({ title }: Props) {
  return (
    <BaseHeader left={<ReturnRoute />} center={<p className="return-title title">{title}</p>} right={<Placeholder />} />
  );
}
