import ReturnRoute from "../ReturnRoute";
import SearchBtn from "../SearchBtn";
import BaseHeader from "./Base";
import styles from "./ReturnTitleSearch.module.css";

type Props = {
  title: string;
  handleSearch: (e?: unknown) => unknown;
};

export default function ReturnTitleSearch({ title, handleSearch }: Props) {
  return (
    <BaseHeader
      left={<ReturnRoute />}
      center={<p className={styles.title}>{title}</p>}
      right={<SearchBtn handleSearch={handleSearch} />}
    />
  );
}
