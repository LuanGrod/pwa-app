import { Delete } from "@global/request/builder/api/Delete";
import { Insert } from "@global/request/builder/api/Insert";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  data: { [key: string]: any };
  setData: Dispatch<SetStateAction<{ [key: string]: any }>>;
  entity: string;
  idParamName: string;
  insertData: any;
};

export default function useToggleAddRemoveSingle({
  data,
  setData,
  entity,
  idParamName,
  insertData,
}: Props) {
  const [loading, setLoading] = useState(false);

  const toggleAddRemove = async () => {
    setLoading(true);

    try {
      if (data[idParamName]) {
        const currentId = data[idParamName];

        setData((prevData) => ({
          ...prevData,
          [idParamName]: "",
        }));

        const deleting = new Delete({
          entity: entity,
          id: currentId,
        });

        await deleting.build(true);
      } else {
        setData((prevData) => ({
          ...prevData,
          [idParamName]: "loading",
        }));

        const insert = new Insert({
          entity: entity,
          body: insertData,
        });

        const response = await insert.build(true);

        setData((prevData) => ({
          ...prevData,
          [idParamName]: response.data.id || "",
        }));
      }
    } catch (error) {
      console.error("Error in toggleAddRemove:", error);
      
      setData((prevData) => ({
        ...prevData,
        [idParamName]: data[idParamName] || "",
      }));
    } finally {
      setLoading(false);
    }
  };

  return { toggleAddRemove, loading };
}
