import Login from "@/app/components/forms/Login";
import Logo from "../../components/icons/Logo";
import styles from "./page.module.css";

type Props = {};

export default function page({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <h1 className={styles.title}>MedRQE</h1>
        <Logo size={139}/>
      </div>
      <Login />
    </div>
  );
}
