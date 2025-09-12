"use client";

import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { Listing } from "@global/request/builder/api/Listing";
import React, { useEffect, useState } from "react";

type Props = {};

export default function page({ }: Props) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const list = new Listing({
        entity: "questoes2"
      })
      return await list.build(true);
    }

    fetchData()
      .then((response) => setData(response))
      .catch((error) => console.error("Erro ao buscar dados:", error))
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <Loading2 loading />


  return (
    <div>{JSON.stringify(data)}</div>
  )
}
