"use client";

import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { Listing } from "@global/component/listing/Listing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { IconItem } from "@global/listing/IconItem";
import useSearch from "@global/hook/useSearch";
import SearchBar from "@global/component/atomic/SearchBar";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import { FlashcardsSalvos } from "@/type/Entities";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import Bandeira from "@global/component/icons/Bandeira";

type Props = {};

export default function page({ }: Props) {
  const { isActive, toggle } = useToggleStatus();

  const { data, loading, error } = useListing<FlashcardsSalvos>({
    entity: "flashcards-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<FlashcardsSalvos>({
    options: data.rows,
    keyParams: ["flashcards_pergunta", "temas_nome", "areas_nome"],
  });

  return (
    <Structure title="Flashcards salvos" handleSearch={toggle}>
      <UnderHeader open={isActive} onClose={toggle}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<FlashcardsSalvos>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <IconItem
            subtitle={`${item.areas_nome} - ${item.temas_nome}`}
            title={item.flashcards_pergunta}
            entity="flashcards"
            entityId={item.flashcards_salvos_id_flashcard}
            icon={<Bandeira size={25} className="logo" />}
          />
        )}
      />
    </Structure>
  );
}
