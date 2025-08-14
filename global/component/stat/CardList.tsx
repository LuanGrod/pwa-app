type ItemProps = {
  name: string;
  value: string;
}

type Props = {
  title?: string;
  items: ItemProps[];
  className?: string;
}

/**
 * Card list to show statistics
 * just render a set of pairs name: value
 * @param {title} [title] - Title of the card
 * @param {items} items - List of items to show
 * @param {className} [className] - Custom class to add to the card
 * @returns A card component displaying the statistics
 */
export default function CardList({ items, className = "", title }: Props) {
  return (
    <div className={`stat-card ${className}`}>
      {title && <p className="card-title">{title}</p>}
      {items.map((item) => (
        <div
          key={item.name}
          className="card-item-name"
        >
          {item.name}: <span className="card-item-value">{item.value}</span>
        </div>
      ))}
    </div>
  )
}