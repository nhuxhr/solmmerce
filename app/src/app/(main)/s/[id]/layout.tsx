import React from "react";
import Link from "next/link";
import { PublicKey } from "@solana/web3.js";

import { getSolmmerceProgram } from "@/helpers/get-solmmerce-program";

import StoreProvider from "./contexts/store";

export type DefaultParams = {
  id: string;
};

type Props = {
  params: DefaultParams;
  children: React.ReactNode;
};

export default async function Layout({ params, children }: Props) {
  const program = getSolmmerceProgram();

  const storePublicKey = new PublicKey(params.id);
  const store = await program.account.store.fetch(storePublicKey);

  return (
    <StoreProvider
      publicKey={storePublicKey.toBase58()}
      account={{ ...store, owner: store.owner.toBase58() }}
    >
      <div className="flex flex-col h-full flex-1 space-y-8 p-3 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{store.name}</h2>
            <p className="text-muted-foreground">
              Owned by{" "}
              <Link
                href={`//explorer.solana.com/address/${store.owner.toBase58()}?cluster=${
                  process.env.NEXT_PUBLIC_CLUSTER
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {store.owner.toBase58().slice(0, 4)}...
                {store.owner.toBase58().slice(-4)}
              </Link>
            </p>
          </div>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </StoreProvider>
  );
}
