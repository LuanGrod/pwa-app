import styles from "./Submit.module.css";

type Props = {
  label?: string;
};

export default function SubmitButton({label = "ENTRAR"}: Props) {
  return <button type="submit" className={styles.container}>{label}</button>;
}
