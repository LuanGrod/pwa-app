"use client";

import { LinkView } from "../../atomic/LinkView";
import UploadImage from "@global/component/atomic/UploadImage";
import { useUser } from "@global/hook/auth/useUser";
import { Dispatch, ReactNode, SetStateAction } from "react";
import useToggleAddRemoveArray from "@global/hook/useToggleAddRemoveArray";

type InsertDataConfig = {
  entityIdField: string;
  userIdField: string;
};

type ToggleAddRemoveConfig = {
  entity: string;
  idParamName: string;
  keyParamName: string;
  insertDataConfig: InsertDataConfig;
};

type InteractiveItemProps = {
  entity: string;
  entityId: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  data: any;
  setData: Dispatch<SetStateAction<any[]>>;
  viewed: boolean;
  icon: ReactNode;
  toggleConfig: ToggleAddRemoveConfig;
};

export function ToggleableItem({
  entity,
  entityId,
  imageSrc,
  subtitle,
  title,
  data,
  setData,
  viewed,
  icon,
  toggleConfig,
}: InteractiveItemProps) {
  const { id: userId } = useUser();

  const insertData = {
    [toggleConfig.insertDataConfig.entityIdField]: entityId,
    [toggleConfig.insertDataConfig.userIdField]: userId,
  };

  const { toggleAddRemove, loading } = useToggleAddRemoveArray({
    data,
    setData,
    entity: toggleConfig.entity,
    idParamName: toggleConfig.idParamName,
    keyParamName: toggleConfig.keyParamName,
    insertData,
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
      <button
        disabled={loading}
        onClick={toggleAddRemove}
        className={`viewed ${viewed ? "active" : ""}`}
      >
        {icon}
      </button>
    </div>
  );
}
