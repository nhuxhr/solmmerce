import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";

export function getMockWallet(): AnchorWallet {
  return {
    publicKey: anchor.web3.Keypair.generate().publicKey,
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject(),
  };
}
