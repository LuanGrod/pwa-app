import Image from "next/image";
import Logo from "../../icons/Logo";
import LogoOverlay from "../LogoOverlay";
import BaseHeader from "./Base";
import styles from "./GreetingsLogo.module.css";

type Props = {};

export default function GreetingsLogo({}: Props) {
  const greetingsElement = () => {
    return (
      <div className={styles.container}>
        <Image src="/project/assets/Foto.png" alt="Foto do usuário" width={45} height={45} />
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
