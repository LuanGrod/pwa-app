"use client";

import { Delete } from "@/request/builder/Delete";
import { LinkView } from "../LinkView";
import UploadImage from "@global/atomic/UploadImage";
import { Insert } from "@/request/builder/Insert";
import Cookie from "@/cookie/Cookie";

type Props = {
  entity: string;
  entityId: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  hasViewed?: boolean;
  viewed?: string | null;
};

export function Item({ entity, entityId, imageSrc, subtitle, title, hasViewed = false, viewed = null }: Props) {
  const handleToggleViewed = async () => {
    if (viewed) {
      const deleteItem = new Delete({ entity: "hot-topics-estudantes", id: parseInt(viewed) });
      const response = await deleteItem.build(true);
      console.log(JSON.stringify(response, null, 2));
    } else {
      const cookies = new Cookie();
      const data = {
        hot_topics_estudantes_id_hot_topic: entityId,
        hot_topics_estudantes_id_estudante: cookies.getCookie("id"),
      };
      const insertItem = new Insert({ entity: "hot-topics-estudantes", data });
      const response = await insertItem.build(true);
      console.log(JSON.stringify(response, null, 2));
    }
  };

  return (
    <div className="list-item-wrapper">
      <LinkView href={`/${entity}/${entityId}`} className="content">
        <UploadImage className="image" alt={title} src={imageSrc} width={45} height={45} />
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </LinkView>
      {hasViewed && <button onClick={handleToggleViewed} className={`viewed ${viewed ? "active" : ""}`}></button>}
    </div>
  );
}
