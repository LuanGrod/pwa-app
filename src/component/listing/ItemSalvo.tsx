"use client";

import { LinkView } from "../LinkView";
import Bandeira from "@global/icons/Bandeira";

type Props = {
  entity: string;
  entityId: string;
  title: string;
  subtitle: string;
};

export function ItemSalvo({ entity, entityId, subtitle, title }: Props) {
  return (
    <div className="list-item-wrapper">
      <LinkView href={`/${entity}/${entityId}`} className="content salvos">
        <div className="image">
          <Bandeira size={25} className="logo" />
        </div>
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </LinkView>
    </div>
  );
}
