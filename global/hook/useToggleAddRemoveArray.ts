import { Delete } from "@global/request/builder/api/Delete";
import { Insert } from "@global/request/builder/api/Insert";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  data: { [key: string]: any };
  setData: Dispatch<SetStateAction<Array<{ [key: string]: any }>>>;
  entity: string;
  idParamName: string;
  keyParamName: string;
  insertData: any;
};

/**
 * Nesse componente a data é o objeto dentro do array e o setData é o set do array completo
 * @param data Objeto que representa o item atual dentro do array
 * @param setData Função para atualizar o array completo
 * @param entity Nome da entidade para operações de inserção e exclusão
 * @param idParamName Nome do campo que contém o ID na entidade
 * @param keyParamName Nome do campo que é usado como chave única para identificar o item no array
 * @param insertData Dados adicionais necessários para a inserção 
 * @returns 
 */
export default function useToggleAddRemoveArray({
  data,
  setData,
  entity,
  idParamName,
  insertData,
  keyParamName,
}: Props) {
  const [loading, setLoading] = useState(false);

  const toggleAddRemove = async () => {
    setLoading(true);

    try {
      if (data[idParamName]) {
        const currentId = data[idParamName];

        setData((prevData) => 
          prevData.map((item) =>
            item[keyParamName] === data[keyParamName]
              ? { ...item, [idParamName]: "" }
              : item
          )
        );

        const deleting = new Delete({
          entity: entity,
          id: currentId,
        });

        await deleting.build(true);
      } else {
        setData((prevData) =>
          prevData.map((item) =>
            item[keyParamName] === data[keyParamName]
              ? { ...item, [idParamName]: "loading" }
              : item
          )
        );

        const insert = new Insert({
          entity: entity,
          body: insertData,
        });

        const response = await insert.build(true);

        setData((prevData) =>
          prevData.map((item) =>
            item[keyParamName] === data[keyParamName]
              ? { ...item, [idParamName]: response.data.id }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error in toggleAddRemove:", error);
      
      setData((prevData) =>
        prevData.map((item) =>
          item[keyParamName] === data[keyParamName]
            ? { ...item, [idParamName]: data[idParamName] || "" }
            : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return { toggleAddRemove, loading };
}
