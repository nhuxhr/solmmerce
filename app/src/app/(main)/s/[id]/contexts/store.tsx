"use client";

import React, { createContext, useContext } from "react";
import * as anchor from "@project-serum/anchor";

import { Solmmerce } from "@/programs/types/solmmerce";

type Store = {
  publicKey: anchor.web3.PublicKey;
  account: anchor.IdlAccounts<Solmmerce>["store"];
};

export const StoreContext = createContext<Store>(null as unknown as Store);

export default function StoreProvider(
  props: React.PropsWithChildren<{
    publicKey: string;
    account: Omit<Store["account"], "owner"> & {
      owner: string;
    };
  }>
) {
  return (
    <StoreContext.Provider
      value={{
        publicKey: new anchor.web3.PublicKey(props.publicKey),
        account: {
          ...props.account,
          owner: new anchor.web3.PublicKey(props.account.owner),
        },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
