import Image from "next/image";
import Link from "next/link";

type Props = {
  isActive?: boolean;
  href: string;
  image: string;
  label: string;
};

export default function FooterItem({ isActive = false, image, label, href }: Props) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center">
      <Image src={image} alt={label} width={30} height={30} className={`icon ${!isActive && "disabled"}`} />
      <p className={`text-[10px] ${isActive ? "text-foreground" : "text-foreground-variation"}`}>{label}</p>
    </Link>
  );
}
