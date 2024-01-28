import useSWR from "swr";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolmmerceProgram from "./use-solmmerce-program";

export default function useStores() {
  const { connected, publicKey } = useWallet();
  const program = useSolmmerceProgram();
  const swr = useSWR(
    connected ? ["stores", publicKey!.toBase58()] : null,
    async () => {
      return await program.account.store.all([
        { memcmp: { offset: 8, bytes: publicKey!.toBase58() } },
      ]);
    }
  );

  return { ...swr, data: swr.data || [] };
}
