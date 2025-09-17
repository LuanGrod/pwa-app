type Props = {
  label: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PerfilItem({ label, value, className = "", children }: Props) {
  if(!value) return null;

  return (
    <div className={`perfil-item ${className}`}>
      <div>
        <p className="label">{label}</p>
        <p className="value">{value}</p>
      </div>
      {children}
    </div>
  )
}