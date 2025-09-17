import { useState } from "react";

type Props = {};

export default function usePdf({}: Props = {}) {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return { numPages, onDocumentLoadSuccess };
}
