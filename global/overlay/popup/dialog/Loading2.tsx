type Props = {
  loading?: boolean;
  overlay?: boolean;
};

export default function Loading2({ loading, overlay = false }: Props) {
  if (!loading) return null;

  return (
    <div className={`popup-wrapper open ${overlay ? "overlay" : ""}`}>
      <svg
        className="spinner theme"
        width="30"
        height="30"
        stroke="#000"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
        </g>
      </svg>
    </div>
  );
}
