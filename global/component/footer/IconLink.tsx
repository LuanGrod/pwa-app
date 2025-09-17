"use client";

import { LinkView } from "@global/component/link/LinkView";
import { Icon } from "@global/type/props/Icon";
import { usePathname } from "next/navigation";
import { ReactElement, cloneElement } from "react";

type Props = {
  href: string;
  icon: ReactElement<Icon>;
  label: string;
};

export default function IconLink({ icon, label, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const iconWithClass = cloneElement(icon, {
    className: [icon.props.className, isActive ? "active" : "inactive"].filter(Boolean).join(" "),
  });

  return (
    <LinkView href={href} className="link">
      {iconWithClass}
      <p className={`${isActive ? "active" : "inactive"}`}>{label}</p>
    </LinkView>
  );
}
