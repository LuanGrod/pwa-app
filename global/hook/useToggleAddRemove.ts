import { Delete } from "@global/request/builder/Delete";
import { Insert } from "@global/request/builder/Insert";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  entity: string;
  idParamName: string;
  keyParamName?: string;
  insertData: any;
};

export default function useToggleAddRemove({
  data,
  setData,
  entity,
  idParamName,
  insertData,
  keyParamName,
}: Props) {
  const [isSaving, setIsSaving] = useState(false);

  const toggleAddRemove = async () => {
    setIsSaving(true);

    if (data[idParamName]) {
      let currentId = data[idParamName];

      setData((prevData: any) => {
        if (Array.isArray(prevData)) {
          return prevData.map((item: any) => {
            if (item[idParamName] === data[idParamName]) {
              item[idParamName] = "";
            }
            return item;
          });
        } else {
          if (prevData) {
            return {
              ...prevData,
              [idParamName]: "",
            };
          }
        }
        return prevData;
      });

      const deleting = new Delete({
        entity: entity,
        id: currentId,
      });

      const response = await deleting.build(true);
    } else {
      //atualizacao inicial p/ icone
      setData((prevData: any) => {
        if (Array.isArray(prevData)) {
          return prevData.map((item: any) => {
            if (item[keyParamName!] === data[keyParamName!]) {
              item[idParamName] = "response.data.id";
            }
            return item;
          });
        } else {
          if (prevData) {
            return {
              ...prevData,
              [idParamName]: "response.data.id",
            };
          }
        }
        return prevData;
      });

      const insert = new Insert({
        entity: entity,
        data: insertData,
      });

      const response = await insert.build(true);

      //atualizacao real com valor da response
      setData((prevData: any) => {
        if (Array.isArray(prevData)) {
          return prevData.map((item: any) => {
            if (item[keyParamName!] === data[keyParamName!]) {
              item[idParamName] = response.data.id;
            }
            return item;
          });
        } else {
          if (prevData) {
            return {
              ...prevData,
              [idParamName]: response.data.id || "",
            };
          }
        }
        return prevData;
      });
    }

    setIsSaving(false);
  };

  return { toggleAddRemove, isSaving };
}
