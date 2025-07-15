type Props = {
  type: string;
  name: string;
  id: string;
  value: any;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  className?: string;
  placeholder: string;
};

export default function InputWidget({ id, name, onBlur, onChange, value, type, className = "", placeholder }: Props) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      onBlur={onBlur}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      value={value}
    />
  );
}
