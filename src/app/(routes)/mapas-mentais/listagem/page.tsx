"use client";

import { Listing } from "@/component/listing/Listing";
import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@/hook/request/useListing";
import { Item as ListItem } from "@/component/listing/Item";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { UnderHeader } from "@global/overlay/drawer/UnderHeader";
import SearchBar from "@global/atomic/SearchBar";
import useSearch from "@/hook/useSearch";
import { useToggle } from "@/hook/useToggle";
import { MapasMentaisListagem } from "@/type/Entities";

type Props = {};

export default function page({}: Props) {
  const filters = useSearchParams().get("filters") || "";
  const { status: searchActive, toggle: toggleSearch } = useToggle();

  const { data, setData, loading, error } = useListing<MapasMentaisListagem>({
    entity: "mapas-mentais",
    params: { filters: filters },
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<MapasMentaisListagem>({
    options: data.rows,
    keyParams: ["mapas_mentais_nome", "temas_nome"],
  });

  return (
    <ReturnTitleSearchStructure title="Mapas Mentais" handleSearch={toggleSearch}>
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
            setData={setData}
            entity="mapas-mentais"
            entityId={item.mapas_mentais_id}
            imageSrc={item.areas_url_imagem}
            subtitle={item.mapas_mentais_nome}
            title={item.temas_nome}
            hasViewed
            viewed={item.mapas_mentais_estudantes_id}
            ToggleAddRemove={{
              entity: "mapas-mentais-estudantes",
              idParamName: "mapas_mentais_estudantes_id",
              insertDataIdParamName: "id_mapa_mental",
              insertDataEntityParamName: "mapas_mentais_estudantes",
            }}
          />
        )}
      />
    </ReturnTitleSearchStructure>
  );
}
