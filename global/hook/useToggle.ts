import { useState } from "react";

export const useToggle = () => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus((prevStatus) => !prevStatus);
  };

  return { status, setStatus, toggle };
};
