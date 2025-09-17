"use client";

import { LinkView } from "@global/component/link/LinkView";
import UploadImage from "@global/component/image/UploadImage";

type ItemProps = {
  entity: string;
  entityId: string;
  imageSrc: string;
  title: string;
  subtitle: string;
};

export function ImageItem({
  entity,
  entityId,
  imageSrc,
  subtitle,
  title,
}: ItemProps) {
  return (
    <div className="list-item-wrapper">
      <LinkView href={`/${entity}/${entityId}`} className="content">
        <UploadImage className="image" alt={title} src={imageSrc} width={45} height={45} />
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </LinkView>
    </div>
  );
}
