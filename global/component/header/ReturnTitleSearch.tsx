import ReturnRoute from "./item/ReturnRoute";
import SearchBtn from "./item/SearchBtn";
import BaseHeader from "./Base";

type Props = {
  title: string;
  handleSearch?: () => void;
  href?: string;
};

export default function ReturnTitleSearch({ title, handleSearch, href }: Props) {
  return (
    <BaseHeader
      left={<ReturnRoute href={href} />}
      center={<p className="return-title-search title">{title}</p>}
      right={<SearchBtn handleSearch={handleSearch} />}
    />
  );
}
