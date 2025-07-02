import { useState } from "react";

type Props = {};

export default function useDialog({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = async () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, setIsOpen, toggleDialog };
}
