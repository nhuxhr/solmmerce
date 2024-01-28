import useSWR from "swr";
import { PublicKey } from "@solana/web3.js";
import useSolmmerceProgram from "./use-solmmerce-program";

export default function useProducts(storePublicKey: PublicKey) {
  const program = useSolmmerceProgram();
  const swr = useSWR(["products", storePublicKey.toBase58()], async () => {
    return await program.account.product.all([
      { memcmp: { offset: 8, bytes: storePublicKey.toBase58() } },
    ]);
  });

  return { ...swr, data: swr.data || [] };
}
