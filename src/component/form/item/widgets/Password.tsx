import OlhoAberto from "@global/icons/OlhoAberto";
import OlhoFechado from "@global/icons/OlhoFechado";

type Props = {
  type: string;
  name: string;
  id: string;
  value: any;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  className?: string;
  placeholder: string;
  data?: any;
};

export default function PasswordWidget({
  type,
  id,
  name,
  onBlur,
  onChange,
  value,
  className = "",
  placeholder,
  data,
}: Props) {
  return (
    <>
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
      <div onClick={() => data.setIsVisible(!data.isVisible)} className="toggleVisibility">
        {data.isVisible ? <OlhoAberto size={26} /> : <OlhoFechado size={26} />}
      </div>
    </>
  );
}
