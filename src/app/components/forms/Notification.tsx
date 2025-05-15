import styles from "./Notification.module.css";

type Props = {
  type: NotificationType;
  message: string;
};

export default function Notification({ message, type }: Props) {
  const typeClass =
    type == "success"
      ? styles.success
      : type == "danger"
      ? styles.danger
      : type == "warning"
      ? styles.warning
      : styles.info;

  if (message && type) {
    return <div className={`${styles.container} ${typeClass}`}>{message}</div>;
  }
}
