import BaseHeader from "./Base";
import ReturnRoute from "../ReturnRoute";
import LogoOverlay from "../LogoOverlay";
import styles from "./ReturnLogo.module.css";

type Props = {};

export default function ReturnLogo({}: Props) {
  const spacingElement = () => {
    return <div className={styles.container}></div>;
  };

  return <BaseHeader left={<ReturnRoute />} center={<LogoOverlay />} right={spacingElement()} />;
}
