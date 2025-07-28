"use client";

import Logo from "@/component/icon/Logo"
import Extensivo from "@/component/overlay/drawer/Extensivo";
import GreetingsLogoStructure from "@/component/structure/GreetingsLogo"
import { diaExtensivo } from "@/type/Entities";
import { Filter } from "@global/component/button/Filter"
import { useKeyDrawer } from "@global/hook/overlay/useKeyDrawer";
import { GetRow } from "@global/request/builder/api/GetRow";
import { useState } from "react";

type Props = {}

export default function page({ }: Props) {
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<diaExtensivo[]>([]);

  const openDrawer = async (index: string) => {
    setLoading(true);

    const getRow = new GetRow({
      entity: "extensivos",
      id: index
    })

    const response = await getRow.build(true);

    setCurrentWeek(response.data.rows);

    setLoading(false);
  }

  const { drawerKey, setDrawerKey, handleOpenDrawer } = useKeyDrawer({ openDrawer });


  return (
    <GreetingsLogoStructure>
      <div className="page-filter">
        <div>
          <h1 className="title">Bem-vindo ao <br />modo extensivo!</h1>
          <h2 className="subtitle">Programe e acompanhe seu estudo</h2>
        </div>
        <div className="filter-wrapper">
          <div className="select-wrapper grid-3">
            {
              Array.from({ length: 52 }).map((_, index) => (
                <Filter key={index} icon={<Logo size={14} className="logo" />} label={`Semana ${index + 1}`} onClick={() => handleOpenDrawer((index + 1).toString())} />
              ))
            }
          </div>
        </div>
      </div>
      <Extensivo
        open={!!drawerKey}
        loading={loading}
        onClose={() => setDrawerKey(null)}
        title={`Semana ${drawerKey ? parseInt(drawerKey) : ""}`}
        data={drawerKey ? currentWeek : []}
        setData={setCurrentWeek}
      />
    </GreetingsLogoStructure>
  )
}