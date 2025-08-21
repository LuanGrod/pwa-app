"use client";

import Voltar from "@global/component/icons/Voltar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  href?: string;
};

export default function ReturnRoute({ href }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (href) router.prefetch(href);
  }, [])

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button onClick={handleClick} className="btn">
      <Voltar size={29} changeOnTheme />
    </button>
  );
}
