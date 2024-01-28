import { BN } from "bn.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function getSOL(x: string | number) {
  const res = new BN(x).divmod(new BN(LAMPORTS_PER_SOL));
  const div = Number(res.div.toString());
  const mod = Number(res.mod.toString());
  return Number(`${div}.${mod}`);
}
