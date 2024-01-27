"use client";

import useSWR from "swr";
import { PublicKey } from "@solana/web3.js";

import useSolmmerceProgram, { programId } from "./use-solmmerce-program";

export const [vaultPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("vault")],
  programId
);

export default function useVaultAccount() {
  const program = useSolmmerceProgram();

  const { data } = useSWR(["vault", vaultPda.toBase58()], async () => {
    return await program.account.vault.fetch(vaultPda);
  });

  return data;
}
