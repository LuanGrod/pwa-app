import Link from "next/link";

type Props = {
  formName: string;
  data: Map<string, any>;
  className?: string;
};

export default function LinkWidget({ data, formName, className = "" }: Props) {
  return (
    <Link href={data.get("href")} className={className}>{formName}</Link>
  );
}
