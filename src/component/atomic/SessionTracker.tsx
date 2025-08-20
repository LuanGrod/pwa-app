"use client";

import { useUser } from "@global/hook/auth/useUser";
import { Insert } from "@global/request/builder/api/Insert";
import { Update } from "@global/request/builder/api/Update";
import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "session";

type SessionData = {
  id: string;
  timestampInitial: number;
  timestampCurrent: number;
};

export default function SessionTracker() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const { id: userId } = useUser();

  const createSession = async () => {

    const insert = new Insert({
      entity: "sessoes-estudos",
      body: {
        "sessoes_estudos_id_estudante": userId,
        "sessoes_estudos_tempo": "1",
      }
    })
    const response = await insert.build(true);

    const timestampInitial = Date.now();

    const sessionObj = {
      id: response.data.id,
      timestampInitial,
      timestampCurrent: timestampInitial,
    };

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionObj));

    setSessionData(sessionObj);
  };

  const updateSession = async (sessionObj: SessionData) => {
    const now = Date.now();
    const durationMinutes = Math.floor(
      (now - sessionObj.timestampInitial) / 60000
    );
    
    const update = new Update({
      entity: "sessoes-estudos",
      body: {
        "sessoes_estudos_id_estudante": userId,
        "sessoes_estudos_tempo": durationMinutes,
      },
      id: sessionData?.id
    })
    const response = await update.build(true);

    const updatedObj = { ...sessionObj, timestampCurrent: now };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedObj));
    setSessionData(updatedObj);
  };

  useEffect(() => {
    if (!userId) return;
    const savedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSession) {
      setSessionData(JSON.parse(savedSession));
    } else {
      createSession();
    }
  }, [userId]);

  useEffect(() => {
    if (!sessionData) return;

    const intervalId = setInterval(() => {
      updateSession(sessionData);
    }, 60000);

    // Limpa o intervalo no unmount
    return () => clearInterval(intervalId);
  }, [sessionData]);

  return null;
}
