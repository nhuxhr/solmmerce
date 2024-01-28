"use client";

import { useSWRConfig } from "swr";
import { useState } from "react";
import { toast } from "sonner";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useSolmmerceProgram from "@/hooks/use-solmmerce-program";
import useVaultAccount, { vaultPda } from "@/hooks/use-vault-account";
import getSOL from "@/helpers/get-sol";

type Props = {
  children?: React.ReactNode;
};

export default function CreateStoreButton({ children }: Props) {
  const { mutate } = useSWRConfig();
  const vault = useVaultAccount();
  const program = useSolmmerceProgram();
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();

  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState<string>();

  const handleCreateStore = async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading("Creating store...", {
      id: "create-store",
      duration: Infinity,
    });

    try {
      if (!connected) throw new Error("Please connect your wallet first.");
      if (!storeName) throw new Error("Please enter a store name.");

      const [storePda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("store"),
          Buffer.from(publicKey!.toBytes()),
          Buffer.from(storeName),
        ],
        program.programId
      );

      const storeAccount = await program.account.store.fetchNullable(storePda);
      if (storeAccount) throw new Error("Store already exists.");

      const meta = JSON.stringify({ createdAt: Date.now() / 1000 });
      const ix = await program.methods
        .createStore(storeName, meta)
        .accounts({
          vault: vaultPda,
          store: storePda,
        })
        .instruction();

      const tx = new Transaction().add(ix);
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature);

      setDialog(false);
      setStoreName("");

      toast.success("Store created successfully.", {
        id: toastId,
        duration: 4000,
      });

      // Revalidate stores
      await mutate(["stores", publicKey!.toBase58()]);
    } catch (error) {
      console.error(error);
      const err = error as Error;
      const message = err.message || "Failed to create store.";
      toast.error(message, { id: toastId, duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        {children || (
          <Button size="sm" className="relative">
            Create Store
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new store</DialogTitle>
          <DialogDescription>
            Create a new store to start selling your products.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Store name cannot be changed once created. Please ensure you enter
            the correct name. Also, the sum of{" "}
            {getSOL(vault?.fees[0].toString() || "0")} SOL is required to create
            a store.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Store Name</Label>
            <Input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              id="name"
              placeholder="My Store"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={loading || !connected || !storeName}
            onClick={handleCreateStore}
          >
            Create Store
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
