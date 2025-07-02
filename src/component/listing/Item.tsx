"use client";

import { Delete } from "@/request/builder/Delete";
import { LinkView } from "../LinkView";
import UploadImage from "@global/atomic/UploadImage";
import { Insert } from "@/request/builder/Insert";
import Cookie from "@/cookie/Cookie";
import useToggleAddRemove from "@/hook/useToggleAddRemove";
import { useUser } from "@/hook/auth/useUser";
import { Dispatch, SetStateAction } from "react";

type ToggleAddRemoveProps = {
  entity: string;
  idParamName: string;
  insertDataIdParamName: string;
  insertDataEntityParamName: string;
};

type Props = {
  data: any;
  setData: Dispatch<SetStateAction<Listagem<any>>>;
  entity: string;
  entityId: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  hasViewed?: boolean;
  viewed?: string | null;
  ToggleAddRemove?: ToggleAddRemoveProps;
};

export function Item({
  data,
  setData,
  entity,
  entityId,
  imageSrc,
  subtitle,
  title,
  hasViewed = false,
  viewed = null,
  ToggleAddRemove,
}: Props) {
  const { id: userId } = useUser();

  if (!ToggleAddRemove || !hasViewed) {
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

  const insertData = {
    [`${ToggleAddRemove.insertDataEntityParamName}_${ToggleAddRemove.insertDataIdParamName}`]: entityId,
    [`${ToggleAddRemove.insertDataEntityParamName}_id_estudante`]: userId,
  };

  const { toggleAddRemove } = useToggleAddRemove({
    data,
    entity: ToggleAddRemove.entity,
    idParamName: ToggleAddRemove.idParamName,
    insertData,
    setData,
  });

  return (
    <div className="list-item-wrapper">
      <LinkView href={`/${entity}/${entityId}`} className="content">
        <UploadImage className="image" alt={title} src={imageSrc} width={45} height={45} />
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </LinkView>
      <button onClick={toggleAddRemove} className={`viewed ${viewed ? "active" : ""}`}></button>
    </div>
  );
}
