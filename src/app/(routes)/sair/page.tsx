"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function page({}: Props) {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/");
    }

    handleLogout();
  }, []);
}
