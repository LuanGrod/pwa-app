"use client";

import dynamic from "next/dynamic";

const LazyPdfVisualizer = dynamic(() => import("./PdfVisualizer"), {
  ssr: false,
});

export default LazyPdfVisualizer;
