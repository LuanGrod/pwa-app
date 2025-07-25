"use client";

import { useRouter } from "next/navigation";
import React, { startTransition, useEffect } from "react";

interface LinkViewProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function LinkView({ href, children, ...props }: LinkViewProps) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(href);
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href, { scroll: false });
    })
  };

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
