import { Icon } from "@global/type/props/Icon";
import IconLink from "./IconLink";
import { ReactElement } from "react";

type Link = {
  href: string;
  icon: ReactElement<Icon>;
  label: string;
};

type Props = {
  className?: string;
  links?: Link[];
};

export default function BaseFooter({ className = "", links }: Props) {
  return (
    <footer className={`footer-wrapper ${className}`}>
      {links?.map((item, index) => (
        <IconLink key={index} href={item.href} icon={item.icon} label={item.label} />
      ))}
    </footer>
  );
}
