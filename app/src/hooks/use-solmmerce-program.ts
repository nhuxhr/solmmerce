"use client";

import { useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";

import idl from "@/programs/idl/solmmerce.json";
import { Solmmerce } from "@/programs/types/solmmerce";

import { getSolmmerceProgram } from "@/helpers/get-solmmerce-program";

export const programId = new anchor.web3.PublicKey(idl.metadata.address);

export default function useSolmmerceProgram(): anchor.Program<Solmmerce> {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<anchor.Program<Solmmerce>>(
    getSolmmerceProgram()
  );

  const sync = () => setProgram(getSolmmerceProgram(wallet));

  useEffect(() => {
    sync();
  }, [connection, wallet]);

  return program;
}
