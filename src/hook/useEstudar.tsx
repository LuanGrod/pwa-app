import { Listing as ListingRequestBuilder } from "@request/builder/Listing";

type useEstudarProps = {
  buildFilterString: (key: string) => string;
  entity: string;
};

export function useEstudar({ buildFilterString, entity }: useEstudarProps) {
  const handleEstudar = async () => {
    const filtros = buildFilterString(entity);
    const listing = new ListingRequestBuilder({ entity: entity, params: { filters: filtros } });
    const result = await listing.build();
    /**
     * TODO: Redirecionar o usuário para a página de visualização do hot topic após a filtragem
     */
    console.log("result =>" + result);
  };

  return handleEstudar;
}
