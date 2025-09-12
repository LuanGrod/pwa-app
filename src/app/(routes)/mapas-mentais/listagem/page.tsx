"use client";

import { Listing } from "@global/component/listing/Listing";
import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { ImageItem } from "@global/listing/ImageItem";
import { useSearchParams } from "next/navigation";
import SearchBar from "@global/component/atomic/SearchBar";
import useSearch from "@global/hook/useSearch";
import { MapasMentaisListagem } from "@/type/Entities";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import useDialog from "@global/hook/overlay/useDialog";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";
  const { isOpen, toggleDialog } = useDialog();

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
    <Structure title="Mapas Mentais" handleSearch={toggleDialog}>
      <UnderHeader open={isOpen} onClose={toggleDialog}>
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
          <ImageItem
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
