import { useState, useImperativeHandle, ForwardedRef } from "react";

type Props = {
  ref: ForwardedRef<any>;
};

export default function useRefDrawer({ ref }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      toggle: () => setIsOpen(!isOpen),
    }),
    [isOpen, setIsOpen]
  );

  return {isOpen, setIsOpen};
}
