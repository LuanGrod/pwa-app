import Lupa from "@global/component/icons/Lupa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  customClass?: string;
}


/**
 * 
 * @param value - The current value of the search input.
 * @param onChange - Function to call when the input value changes.
 * @param placeholder - Placeholder text for the input field.
 * @param customClass - Additional CSS classes to apply to the search container. 
 * @example
 * customClass ["variation"] = var(--background) in dark theme
 * @returns 
 */
export default function SearchBar({ value, onChange, placeholder = "Buscar", customClass = "" }: SearchBarProps) {
  return (
    <div className={`search-container ${customClass}`}>
      <span className="search-icon">
        <Lupa size={17} color="#B0B0B0" />
      </span>
      <input
        autoFocus
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
