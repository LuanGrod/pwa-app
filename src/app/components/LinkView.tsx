"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { flushSync } from "react-dom";

interface LinkViewProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function LinkView({ href, children, ...props }: LinkViewProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href, { scroll: false });
    })
    // if ("startViewTransition" in document) {
    //   document.startViewTransition(() => {
    //     flushSync(() => {
    //       router.push(href, { scroll: false });
    //     });
    //   });
    // } else {
    //   router.push(href);
    // }
  };

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
