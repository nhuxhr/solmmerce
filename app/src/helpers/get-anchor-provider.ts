import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";

import { getMockWallet } from "./get-mock-wallet";

export function getAnchorProvider(wallet: AnchorWallet = getMockWallet()) {
  if (!process.env.NEXT_PUBLIC_CLUSTER_URL) {
    throw new Error("NEXT_PUBLIC_CLUSTER_URL is undefined");
  }

  return new anchor.AnchorProvider(
    new anchor.web3.Connection(process.env.NEXT_PUBLIC_CLUSTER_URL),
    wallet,
    { preflightCommitment: "recent", commitment: "processed" }
  );
}
