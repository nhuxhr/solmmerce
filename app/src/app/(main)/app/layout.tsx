"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserNav } from "@/components/user-nav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { visible, setVisible } = useWalletModal();
  const { connected } = useWallet();

  if (!connected) {
    return (
      <>
        <AlertDialog open={!visible}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Wallet Connection Required</AlertDialogTitle>
              <AlertDialogDescription>
                To initiate your Solmmerce experience, kindly connect your
                wallet. This step is essential for seamless transactions and
                accessing the full range of features.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setVisible(true)}>
                Connect Wallet
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full flex-1 space-y-8 p-3 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Continue your e-commerce journey with Solmmerce.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </>
  );
}
