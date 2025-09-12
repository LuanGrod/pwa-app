"use client";

import { publicRoutes } from "@/middleware";
import { useUser } from "@global/hook/auth/useUser";
import { Insert } from "@global/request/builder/api/Insert";
import { Update } from "@global/request/builder/api/Update";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "session";

type SessionData = {
  id: string;
  timestampInitial: number;
  timestampCurrent: number;
};

type SessionConfig = {
  entity: string;
  userIdField: string;
  durationField: string;
};

type Props = {
  excludedRoutes?: string[];
  config: SessionConfig;
};

export default function SessionTracker({
  excludedRoutes = ["/sair"],
  config
}: Props) {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const { id: userId } = useUser();
  const pathName = usePathname();

  const createSession = async () => {
    const insert = new Insert({
      entity: config.entity,
      body: {
        [config.userIdField]: userId,
        [config.durationField]: "1",
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
      entity: config.entity,
      body: {
        [config.userIdField]: userId,
        [config.durationField]: durationMinutes,
      },
      id: sessionData?.id
    })
    const response = await update.build(true);

    if (response.success) {
      const updatedObj = { ...sessionObj, timestampCurrent: now };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedObj));
      setSessionData(updatedObj);
    }
  };

  useEffect(() => {
    if (!userId || publicRoutes.includes(pathName) || excludedRoutes.includes(pathName)) return;
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
