import { useState } from "react";

export default function useToggleStatus() {
  const [isActive, setIsActive] = useState(false);

  const toggle = async () => {
    setIsActive((prev) => !prev);
  };

  return { isActive, setIsActive, toggle };
}
