import { useRouter } from "next/navigation";

type useEstudarProps = {
  buildFilterString: (key: string) => string;
  entity: string;
};

export function useEstudar({ buildFilterString, entity }: useEstudarProps) {
  const router = useRouter();

  const handleEstudar = async () => {
    const filtros = buildFilterString(entity);

    // alerkt(filtros);
    router.push(`/${entity}/listagem?filters=${filtros}`);
  };

  return handleEstudar;
}
