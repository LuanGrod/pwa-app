"use client";

import { LinkView } from "../../../global/component/atomic/LinkView";
import UploadImage from "@global/component/atomic/UploadImage";
import useToggleAddRemove from "@global/hook/useToggleAddRemove";
import { useUser } from "@global/hook/auth/useUser";
import { Dispatch, SetStateAction } from "react";

type ToggleAddRemoveProps = {
  entity: string;
  idParamName: string;
  keyParamName: string;
  insertDataIdParamName: string;
  insertDataEntityParamName: string;
};

type Props = {
  data?: any;
  setData: Dispatch<SetStateAction<any[]>>
  entity: string;
  entityId: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  hasViewed?: boolean;
  viewed?: boolean;
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
  viewed = false,
  ToggleAddRemove,
}: Props) {
  const { id: userId } = useUser();

  if (!ToggleAddRemove || !hasViewed || !setData || !data) {
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

  const { toggleAddRemove, isSaving } = useToggleAddRemove({
    data,
    entity: ToggleAddRemove.entity,
    idParamName: ToggleAddRemove.idParamName,
    keyParamName: ToggleAddRemove.keyParamName,
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
      <button disabled={isSaving} onClick={toggleAddRemove} className={`viewed ${viewed ? "active" : ""}`}></button>
    </div>
  );
}
