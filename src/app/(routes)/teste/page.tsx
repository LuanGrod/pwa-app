import styles from "./page.module.css";
type Props = {}

export default function page({ }: Props) {
  return (
    <>
      <div className={styles.div}>Ocupa 100% da tela usando 100svh</div>
      <div className={styles.div}>Ocupa 100% da tela usando 100lvh</div>
      <div className={styles.div}>Ocupa 100% da tela usando 100dvh</div>
      <div className={styles.div}>Ocupa 100% da tela usando 100vh</div>
    </>
  )
}