"use client";
import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";

type Props = {};

export default function page({}: Props) {
  const handleSearch = (e?: unknown) => {
    // Implement search functionality here
    console.log("Search triggered", e);
  };

  return (
    <ReturnTitleSearchStructure title="Hot Topics" handleSearch={handleSearch}>
      <h1>Hot Topics</h1>
    </ReturnTitleSearchStructure>
  );
}
