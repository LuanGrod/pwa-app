type Props = {
  name: string;
  id: string;
  value: any;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  className?: string;
};

export default function TextareaWidget({ id, name, onBlur, onChange, value, className = "" }: Props) {
  return (
    <textarea
      defaultValue={value}
      name={name}
      id={id}
      onBlur={onBlur}
      onChange={onChange}
      className={className}
    ></textarea>
  );
}
