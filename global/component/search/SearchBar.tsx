import Lupa from "@global/component/icon/Lupa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * @param value - The current value of the search input.
 * @param onChange - Function to call when the input value changes.
 * @param placeholder - Placeholder text for the input field.
 * @param className - Additional CSS classes to apply to the search container. 
 * @example
 * className ["variation"] = var(--background) in dark theme
 * @returns 
 */
export default function SearchBar({ value, onChange, placeholder = "Buscar", className = "" }: SearchBarProps) {
  return (
    <div className={`search-container ${className}`}>
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
