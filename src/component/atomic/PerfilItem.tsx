type Props = {
  label: string;
  value?: string;
  customClass?: string;
  children?: React.ReactNode;
}

export default function PerfilItem({ label, value, customClass = "", children }: Props) {
  if(!value) return null;

  return (
    <div className={`perfil-item ${customClass}`}>
      <div>
        <p className="label">{label}</p>
        <p className="value">{value}</p>
      </div>
      {children}
    </div>
  )
}