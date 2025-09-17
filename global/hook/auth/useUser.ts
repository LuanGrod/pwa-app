import Cookie from "@global/cookie/handler/Handler";
import { useEffect, useMemo, useState } from "react";

export const useUser = () => {
  const [id, setId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookie = new Cookie();
    setId(cookie.getCookie("id") || "");
    setToken(cookie.getCookie("token") || "");
    setLoading(false);
  }, []);

  return { id, token, loading };
};
