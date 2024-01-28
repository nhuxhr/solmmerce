import { Keypair } from "@solana/web3.js";
import { useState } from "react";

export default function useReference() {
  const [reference, setReference] = useState(Keypair.generate().publicKey);
  const generate = () => setReference(Keypair.generate().publicKey);
  return { reference, generate };
}
