"use client";
import { Icon } from "@public/global/js/types/Icon";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";
import styles from "./LinkWithIcon.module.css";
import { LinkView } from "../LinkView";

type Props = {
  href: string;
  icon: ReactElement<Icon>;
  label: string;
};

export default function IconLink({ icon, label, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const iconWithClass = React.cloneElement(icon, {
    className: [icon.props.className, isActive ? "active" : "inactive"].filter(Boolean).join(" "),
  });

  return (
    <LinkView href={href} className="link">
      {iconWithClass}
      <p className={`${isActive ? "active" : "inactive"}`}>{label}</p>
    </LinkView>
  );
}
