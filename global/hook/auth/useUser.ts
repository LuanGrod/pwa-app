import Cookie from "@global/cookie/Cookie";
import { useEffect, useMemo, useState } from "react";

export const useUser = () => {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const cookie = new Cookie();
    setId(cookie.getCookie("id") || "");
    setToken(cookie.getCookie("token") || "");
  }, []);

  return { id, token };
};
