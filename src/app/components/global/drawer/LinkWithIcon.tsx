import Link from "next/link";
import { Icon } from "@public/global/js/Types/Icon";
import { ReactElement } from "react";
import styles from "./LinkWithIcon.module.css";

type Props = {
  href: string;
  icon: ReactElement<Icon>;
  label: string;
};

export default function DrawerLinkWithIcon({ href, icon, label }: Props) {
  return (
    <Link href={href} className={styles.link}>
      {icon}
      <p>{label}</p>
    </Link>
  );
}
