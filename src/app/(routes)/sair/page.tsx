"use client";

import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function page({}: Props) {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "auth-store=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.refresh();
    }

    handleLogout();
  }, []);

  return <Loading2 loading overlay />;
}
