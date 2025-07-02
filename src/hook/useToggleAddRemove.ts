import { Delete } from "@/request/builder/Delete";
import { Insert } from "@/request/builder/Insert";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  entity: string;
  idParamName: string;
  insertData: any;
};

export default function useToggleAddRemove({ data, setData, entity, idParamName, insertData }: Props) {
  const toggleAddRemove = async () => {
    console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(insertData, null, 2));

    if (data[idParamName]) {
      console.log("Remover item");

      const deleting = new Delete({
        entity: entity,
        id: data[idParamName],
      });

      const response = await deleting.build(true);

      setData((prevData: any) => {
        if (prevData) {
          return {
            ...prevData,
            [idParamName]: "",
          };
        }
        return prevData;
      });
    } else {
      console.log("Salvar item");

      const insert = new Insert({
        entity: entity,
        data: insertData,
      });

      const response = await insert.build(true);

      setData((prevData: any) => {
        if (prevData) {
          return {
            ...prevData,
            [idParamName]: response.data.id || "",
          };
        }
        return prevData;
      });
    }
  };

  return { toggleAddRemove };
}
