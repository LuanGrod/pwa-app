import ReturnRoute from "./item/ReturnRoute";
import SearchBtn from "./item/SearchBtn";
import BaseHeader from "./Base";

type Props = {
  title: string;
  handleSearch?: () => void;
};

export default function ReturnTitleSearch({ title, handleSearch}: Props) {
  return (
    <BaseHeader
      left={<ReturnRoute />}
      center={<p className="return-title-search title">{title}</p>}
      right={<SearchBtn handleSearch={handleSearch} />}
    />
  );
}
