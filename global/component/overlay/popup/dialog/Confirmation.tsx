import Dialog from "./Dialog"

type Props = {
  title: string;
  open?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

export default function Confirmation({ title, open, onClose, onConfirm, onCancel, className = "" }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className={`confirmation ${className}`} overlay title={title}>
      <div className="action-wrapper">
        <button className="confirm" onClick={onConfirm}>Sim</button>
        <button className="cancel" onClick={onCancel}>Não</button>
      </div>
    </Dialog>
  )
}