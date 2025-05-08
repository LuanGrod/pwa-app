import Logo from "../../icons/Logo";
import LogoOverlay from "../LogoOverlay";
import BaseHeader from "./Base";
import styles from "./GreetingsLogo.module.css";

type Props = {};

export default function GreetingsLogo({}: Props) {
  const greetingsElement = () => {
    return (
      <div className={styles.container}>
        <Logo size={29} changeOnTheme />
        <p className={styles.title}>Olá Israel!</p>
      </div>
    );
  };

  return (
    <>
      <BaseHeader left={greetingsElement()} center={<LogoOverlay/>} />
    </>
  );
}
