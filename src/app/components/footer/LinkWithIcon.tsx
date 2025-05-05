"use client";
import { Icon } from "@public/global/js/types/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

type Props = {
  href: string;
  icon: ReactElement<Icon>;
  label: string;
};

export default function FooterLinkWithIcon({ icon, label, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const iconWithClass = React.cloneElement(icon, {
    className: [icon.props.className, isActive ? "active" : "inactive"].filter(Boolean).join(" "),
  });

  return (
    <Link href={href} className="link">
      {iconWithClass}
      <p className={`${isActive ? "active" : "inactive"}`}>{label}</p>
    </Link>
  );
}
