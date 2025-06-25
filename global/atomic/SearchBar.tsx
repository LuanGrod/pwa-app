import Lupa from "@global/icons/Lupa";

// SearchBar.tsx
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Buscar" }: SearchBarProps) {
  return (
    <div className="search-container">
      <span className="search-icon">
        <Lupa size={17} color="#B0B0B0" />
      </span>
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
