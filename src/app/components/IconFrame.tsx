import Image from "next/image";
import Link from "next/link";
import styles from "./IconFrame.module.css";

type Props = {
  href: string;
  image: string;
  label: string;
};

export default function IconFrame({ image, label, href }: Props) {
  return (
    <Link href={href} className={styles.link}>
      <Image src={image} alt={label} width={106} height={106} />
      <p className={styles.label}>{label}</p>
    </Link>
  );
}
