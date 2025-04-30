import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  image: string;
  label: string;
};

export default function IconFrame({ image, label, href }: Props) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center gap-y-[10px]">
      <Image src={image} alt={label} width={106} height={106} />
      <p className="text-center text-base font-bold text-foreground">{label}</p>
    </Link>
  );
}
