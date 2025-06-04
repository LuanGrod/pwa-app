import { Listing as ListingRequestBuilder } from "@request/builder/Listing";

export function useEstudar({buildFilterString}: {buildFilterString: any}) {
    const handleEstudar = async () => {
        const filtros = buildFilterString();
        const listing = new ListingRequestBuilder({entity: 'hot-topics', params: {filtros: filtros}});
        const result = await listing.build();
        /**
         * TODO: Redirecionar o usuário para a página de visualização do hot topic após a filtragem
         */
        console.log(result);
    };

    return handleEstudar;
}

