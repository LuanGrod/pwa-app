"use client";

import { useEstudante } from "@/store/EstudanteStore";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function page({ }: Props) {
  const router = useRouter();
  const { clearEstudante } = useEstudante()

  useEffect(() => {
    async function handleLogout() {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      clearEstudante();
      router.refresh();
    }

    handleLogout();
  }, []);

  return <Loading2 loading overlay />;
}
