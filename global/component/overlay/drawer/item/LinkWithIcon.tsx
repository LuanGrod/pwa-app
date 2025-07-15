import Link from "next/link";
import { Icon } from "@public/global/js/types/Icon";
import { ReactElement } from "react";

type Props = {
  href: string;
  icon: ReactElement<Icon>;
  label: string;
};

export default function DrawerLinkWithIcon({ href, icon, label }: Props) {
  return (
    <Link href={href} className="link">
      {icon}
      <p>{label}</p>
    </Link>
  );
}
