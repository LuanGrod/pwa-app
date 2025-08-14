type Props = {
  name: string
  value: string
}

export default function SimpleLine({ name, value }: Props) {
  return (
     <p className="stat-simple-line">{name}: <span className="value">{value}</span></p>
  )
}