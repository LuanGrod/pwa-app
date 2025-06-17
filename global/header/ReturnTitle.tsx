import ReturnRoute from "./item/ReturnRoute";
import BaseHeader from "./Base";
import Spacing from "./item/Spacing";

type Props = {
  title: string;
};

export default function ReturnTitle({ title }: Props) {
  return (
    <BaseHeader left={<ReturnRoute />} center={<p className="return-title title">{title}</p>} right={<Spacing />} />
  );
}
