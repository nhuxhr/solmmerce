import React, { useEffect, useRef } from "react";
import { createQR } from "@solana/pay";

export default function QRCode({ url }: { url: string }) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qr = createQR(new URL(url), 350, "transparent");
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [url, qrRef]);

  return <div ref={qrRef} />;
}
