import Mais from "@global/component/icons/Mais";
import Menos from "@global/component/icons/Menos";

type Props = {
  label?: string;
  value: number;
  renderedValue?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  minValue: number;
  maxValue: number;
  step: number;
}

/**
 * @param value Current value of the range selector
 * @param onIncrement Function to call when incrementing the value
 * @param onDecrement Function to call when decrementing the value
 * @param maxValue Maximum value allowed for the range selector
 * @param minValue Minimum value allowed for the range selector
 * @param step Step size for incrementing/decrementing the value
 * @param label Optional label for the range selector
 * @param renderedValue Optional formatted value to display instead of the raw value 
 * @returns The RangeSelector component which allows users to adjust a numeric value within specified limits using increment and decrement buttons, along with a visual progress bar.
 */
export default function RangeSelector({ value, onIncrement, onDecrement, maxValue, minValue, step, label, renderedValue }: Props) {

  const canDecrement = value - step >= minValue;
  const canIncrement = value < maxValue;

  return (
    <div className="range-selector-wrapper">
      {label && <p className="label">{label}</p>}
      <p className="value">{renderedValue || value}</p>
      <div className="input-wrapper">
        <button
          onClick={onDecrement}
          disabled={!canDecrement}
          className={`action-btn ${canDecrement ? "" : "disabled"}`}
        >
          <Menos size={20} changeOnTheme className="inverted" />
        </button>
        <div className="progress-bar-bg">
          <div className={`progress-bar`} style={{ width: `${(value / maxValue) * 100}%` }}></div>
        </div>
        <button
          onClick={onIncrement}
          disabled={!canIncrement}
          className={`action-btn ${canIncrement ? "" : "disabled"}`}
        >
          <Mais size={20} changeOnTheme className="inverted" />
        </button>
      </div>
    </div>
  );
}