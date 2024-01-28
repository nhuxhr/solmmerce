"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
