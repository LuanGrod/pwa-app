import ReturnTitleSearchStructure from "../../components/structure/ReturnTitleSearch";

type Props = {};

export default function page({}: Props) {
  async function handleSearch() {
    "use server";
    alert("not implemented yet");
  }

  return (
    <ReturnTitleSearchStructure title="Salvos" handleSearch={handleSearch}>
      salvos
    </ReturnTitleSearchStructure>
  );
}
