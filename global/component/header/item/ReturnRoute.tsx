"use client";

import Voltar from "@global/component/icon/Voltar";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, startTransition } from "react";

type Props = {
  href?: string;
};

export default function ReturnRoute({ href }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (href) {
      router.prefetch(href);
    }
  }, [href, router]);

  const handleClick = useCallback(() => {
    startTransition(() => {
      if (href) {
        router.push(href);
      } else {
        router.back();
      }
    });
  }, [href, router]);

  return (
    <button onClick={handleClick} className="btn">
      <Voltar size={29} changeOnTheme />
    </button>
  );
}
