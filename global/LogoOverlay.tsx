import Logo from "../src/app/components/icons/Logo";
import styles from "./LogoOverlay.module.css";

type Props = {};

export default function LogoOverlay({}: Props) {
  return (
    <div className={styles.container}>
      <Logo size={29} />
    </div>
  );
}
