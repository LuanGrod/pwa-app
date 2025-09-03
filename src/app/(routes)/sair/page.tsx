"use client";

import { useEstudante } from "@/store/EstudanteStore";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import Cookie from "@global/cookie/Cookie";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

type Props = {};

export default function page({ }: Props) {
  const router = useRouter();
  const cookie = new Cookie();
  const { clearEstudante } = useEstudante()

  useEffect(() => {
    async function handleLogout() {
      cookie.removeCookie("token");
      cookie.removeCookie("id");
      // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      clearEstudante();
      router.refresh();
    }

    handleLogout();
  }, []);

  return <Loading2 loading overlay />;
}
