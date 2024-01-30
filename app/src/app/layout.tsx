import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme";
import { SolanaWalletProvider } from "@/providers/solana";
import "./globals.css";

dayjs.extend(relativeTime);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Solmmerce - Decentralized E-Commerce on Solana`,
  description: `Experience decentralized e-commerce on the Solana blockchain. Create custom stores, showcase products, and enable fast, secure transactions for your business. Join the future of online commerce with Solmmerce.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SolanaWalletProvider>{children}</SolanaWalletProvider>
        </ThemeProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
