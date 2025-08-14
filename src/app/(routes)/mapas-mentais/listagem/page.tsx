"use client";

import { Listing } from "@global/component/listing/Listing";
import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { Item as ListItem } from "@/component/listing/Item";
import { useSearchParams } from "next/navigation";
import SearchBar from "@global/component/atomic/SearchBar";
import useSearch from "@global/hook/useSearch";
import { useToggle } from "@global/hook/useToggle";
import { MapasMentaisListagem } from "@/type/Entities";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {};

export default function page({}: Props) {
  const filters = useSearchParams().get("filters") || "";
  const { status: searchActive, toggle: toggleSearch } = useToggle();

  const { data, setData, loading, error } = useListing<MapasMentaisListagem>({
    entity: "mapas-mentais",
    params: { filters: filters },
    needsAuthorization: true,
  });

  const { filteredData, setFilteredData, searchTerm, setSearchTerm } = useSearch<MapasMentaisListagem>({
    options: data.rows,
    keyParams: ["mapas_mentais_nome", "temas_nome"],
  });

  return (
    <Structure title="Mapas Mentais" handleSearch={toggleSearch}>
      <UnderHeader open={searchActive} onClose={toggleSearch}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<MapasMentaisListagem>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <ListItem
            data={item}
            setData={setFilteredData}
            entity="mapas-mentais"
            entityId={item.mapas_mentais_id}
            imageSrc={item.areas_url_imagem}
            subtitle={item.mapas_mentais_nome}
            title={item.temas_nome}
            hasViewed
            viewed={!!item.mapas_mentais_estudantes_id}
            ToggleAddRemove={{
              entity: "mapas-mentais-estudantes",
              idParamName: "mapas_mentais_estudantes_id",
              keyParamName: "mapas_mentais_id",
              insertDataIdParamName: "id_mapa_mental",
              insertDataEntityParamName: "mapas_mentais_estudantes",
            }}
          />
        )}
      />
    </Structure>
  );
}
