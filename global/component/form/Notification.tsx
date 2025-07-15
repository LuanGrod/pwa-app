type Props = {
  type: NotificationType;
  message: string[];
};

export default function Notification({ message, type }: Props) {
  if (message && type) {
    return (
      <div className={`submit-return-wrapper ${type}`}>
        {Array.isArray(message) ? message.map((msg, idx) => <p key={idx}>{msg}</p>) : <p>{message}</p>}
      </div>
    );
  }
}
