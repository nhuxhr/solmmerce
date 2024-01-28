"use client";

import { BN } from "bn.js";
import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import parseMeta from "@/helpers/parse-meta";
import { Solmmerce } from "@/programs/types/solmmerce";
import useSolmmerceProgram from "@/hooks/use-solmmerce-program";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Props = {
  store: {
    publicKey: anchor.web3.PublicKey;
    account: anchor.IdlAccounts<Solmmerce>["store"];
  };
};

export default function StoreCard({ store }: Props) {
  const meta = parseMeta(store.account.meta);

  const program = useSolmmerceProgram();
  const { connection } = useConnection();
  const { connected, sendTransaction } = useWallet();

  const [loading, setLoading] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [productName, setProductName] = useState<string>();
  const [productPrice, setProductPrice] = useState<string>();

  const handleAddProduct = async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading("Adding product...", {
      duration: Infinity,
    });

    try {
      if (!connected) throw new Error("Please connect your wallet first.");
      if (!productName) throw new Error("Please enter a product name.");
      if (!productPrice) throw new Error("Please enter a product price.");

      const price = Number(productPrice);
      if (isNaN(price)) throw new Error("Please enter a valid product price.");

      const [productPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("product"),
          Buffer.from(store.publicKey.toBytes()),
          Buffer.from(productName),
        ],
        program.programId
      );

      const meta = JSON.stringify({ createdAt: Date.now() / 1000 });
      const ix = await program.methods
        .createProduct(productName, new BN(price * LAMPORTS_PER_SOL), meta)
        .accounts({
          store: store.publicKey,
          product: productPda,
        })
        .instruction();

      const tx = new Transaction().add(ix);
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature);

      setAddProduct(false);
      setProductName("");
      setProductPrice("");

      toast.success("Product added successfully.", {
        id: toastId,
        duration: 4000,
      });
    } catch (error) {
      console.error(error);
      const err = error as Error;
      const message = err.message || "Failed to create product.";
      toast.error(message, { id: toastId, duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
              <Image
                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${store.publicKey.toBase58()}&size=150`}
                alt={store.account.name}
                fill
                className="transition-all hover:scale-105"
                loader={({ src }) => src}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>
              <Link
                href={`/s/${store.publicKey.toBase58()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Store
              </Link>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setAddProduct(true)}>
              Add Product
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{store.account.name}</h3>
          {meta.createdAt && (
            <p className="text-xs text-muted-foreground">
              {dayjs().to(dayjs.unix(meta.createdAt))}
            </p>
          )}
        </div>
      </div>

      <Drawer open={addProduct} onOpenChange={setAddProduct}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Add Product</DrawerTitle>
              <DrawerDescription>
                Add a new product to your store "{store.account.name}".
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="grid items-start gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    id="name"
                    placeholder="My Product"
                    onPointerDown={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    id="price"
                    placeholder="1"
                    step={0.1}
                    min={0}
                    onPointerDown={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                disabled={
                  loading || !connected || !productName || !productPrice
                }
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
