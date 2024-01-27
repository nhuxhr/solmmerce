import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";

import idl from "@/programs/idl/solmmerce.json";
import { Solmmerce } from "@/programs/types/solmmerce";
import { programId } from "@/hooks/use-solmmerce-program";

import { getMockWallet } from "./get-mock-wallet";
import { getAnchorProvider } from "./get-anchor-provider";

export function getSolmmerceProgram(
  wallet: AnchorWallet = getMockWallet()
): anchor.Program<Solmmerce> {
  const provider = getAnchorProvider(wallet);
  return new anchor.Program(idl as any, programId, provider);
}
