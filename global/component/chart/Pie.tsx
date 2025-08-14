import { PieChart } from "react-minimal-pie-chart"

type Data = {
  title: string;
  value: any;
  color: string;
}

type Props = {
  data: Data[];
  title?: string;
  subtitle?: string;
}

/**
 * Component that applies custom styles to the PieChart component from the react-minimal-pie-chart library.
 * @param {Data[]} data - Array of data objects for the pie chart.
 * @param {string} [customClass] - Optional custom CSS class for styling. 
 * @returns 
 */
export default function Pie({ data, title, subtitle, }: Props) {
  return (
    <div className="graph-wrapper">
      <PieChart
        data={data}
        startAngle={180}
        className="graph"
      />
      <div className="front">
        {title && <span className="title">{title}</span>}
        {subtitle && <span className="subtitle">{subtitle}</span>}
      </div>
    </div>
  )
}