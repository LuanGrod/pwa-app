"use client";

import { LinkView } from "@global/component/link/LinkView";
import { ReactNode } from "react";

type Props = {
  entity: string;
  entityId: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
};

export function IconItem({ entity, entityId, subtitle, title, icon }: Props) {
  return (
    <div className="list-item-wrapper">
      <LinkView href={`/${entity}/${entityId}`} className="content salvos">
        <div className="image">
          {icon}
        </div>
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </LinkView>
    </div>
  );
}
