"use client";

import Voltar from "@global/component/icons/Voltar";
import { useRouter } from "next/navigation";

type Props = {};

export default function ReturnRoute({}: Props) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="btn">
      <Voltar size={29} changeOnTheme />
    </button>
  );
}
