import { useState } from "react";


export default function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = async () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, setIsOpen, toggleDialog };
}
