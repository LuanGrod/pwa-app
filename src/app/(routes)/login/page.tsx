import Login from "@/component/form/Login";
import styles from "./page.module.css";
import Logo from "@/component/icon/Logo";

type Props = {};

export default function page({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <h1 className={styles.title}>MedRQE</h1>
        <Logo size={139} />
      </div>
      <Login />
    </div>
  );
}
