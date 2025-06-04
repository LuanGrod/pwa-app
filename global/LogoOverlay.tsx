import Logo from "../src/component/icon/Logo";
import styles from "./LogoOverlay.module.css";

type Props = {};

export default function LogoOverlay({}: Props) {
  return (
    <div className={styles.container}>
      <Logo size={25} />
    </div>
  );
}
