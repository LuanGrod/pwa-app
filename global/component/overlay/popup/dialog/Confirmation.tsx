import Dialog from "./Dialog"

type Props = {
  title: string;
  open?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  customClass?: string;
}

export default function Confirmation({ title, open, onClose, onConfirm, onCancel, customClass = "" }: Props) {
  return (
    <Dialog open={open} onClose={onClose} customClass={`confirmation ${customClass}`} overlay title={title}>
      <div className="action-wrapper">
        <button className="confirm" onClick={onConfirm}>Sim</button>
        <button className="cancel" onClick={onCancel}>Não</button>
      </div>
    </Dialog>
  )
}