import ReturnRoute from "../ReturnRoute";
import BaseHeader from "./Base";
import styles from "./ReturnTitle.module.css";

type Props = {};

export default function Return({}: Props) {
  const spacingElement = () => {
    return <div className={styles.container}></div>;
  };

  return <BaseHeader left={<ReturnRoute />} center={spacingElement()} right={spacingElement()} />;
}
