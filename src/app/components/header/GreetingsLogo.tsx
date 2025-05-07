import Logo from "../icons/Logo";
import styles from "./GreetingsLogo.module.css";

type Props = {};

export default function GreetingsLogo({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon_container}>
        <Logo size={29} changeOnTheme />
        <p className={styles.title}>Olá Israel!</p>
      </div>
      <div className={styles.icon_overlay}>
        <Logo size={29} />
      </div>
    </div>
  );
}
