"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  fileUrl: string;
};

export default function PdfVisualizer({ fileUrl }: Props) {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-viewer">
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<Loading2 loading />}>
        {Array.from({ length: numPages || 0 }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<Loading2 loading />}
          />
        ))}
      </Document>
    </div>
  );
}
