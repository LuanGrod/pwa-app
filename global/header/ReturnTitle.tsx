import ReturnRoute from "../ReturnRoute";
import BaseHeader from "./Base";
import styles from "./ReturnTitle.module.css";

type Props = {
  title: string;
};

export default function ReturnTitle({ title }: Props) {
  const spacingElement = () => {
    return <div className={styles.container}></div>;
  };

  return (
    <BaseHeader left={<ReturnRoute />} center={<p className={styles.title}>{title}</p>} right={spacingElement()} />
  );
}
