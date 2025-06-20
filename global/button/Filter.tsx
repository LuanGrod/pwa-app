import Logo from "@component/icon/Logo";

type FilterProps = {
  onClick: () => void;
  label: string;
  big?: boolean;
};

export function Filter({ onClick, label, big = false }: FilterProps) {
  return (
    <button className={`btn-filter ${big ? "big" : ""}`} onClick={onClick}>
      <Logo size={big ? 26 : 14} />
      <p className="label">{label}</p>
    </button>
  );
}
