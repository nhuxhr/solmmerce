"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import * as anchor from "@project-serum/anchor";
import { useConnection } from "@solana/wallet-adapter-react";

import getSOL from "@/helpers/get-sol";
import parseMeta from "@/helpers/parse-meta";
import { Solmmerce } from "@/programs/types/solmmerce";
import useSolmmerceProgram from "@/hooks/use-solmmerce-program";
import useReference from "@/hooks/use-reference";

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
import QRCode from "../qr-code";

type Props = {
  product: {
    publicKey: anchor.web3.PublicKey;
    account: anchor.IdlAccounts<Solmmerce>["product"];
  };
};

export default function ProductCard({ product }: Props) {
  const explorerLink = `//explorer.solana.com/address/${product.publicKey.toBase58()}?cluster=${
    process.env.NEXT_PUBLIC_CLUSTER
  }`;
  const meta = parseMeta(product.account.meta);

  const program = useSolmmerceProgram();
  const { connection } = useConnection();
  const { reference, generate } = useReference();

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
  const [drawer, setDrawer] = useState(false);

  const handlePurchase = async () => {
    const signatures = await connection.getSignaturesForAddress(reference, {
      limit: 1,
    });
    if (signatures.length) {
      generate();
      return toast.error("Reference already used. Please try again.");
    }
    setDrawer(true);
  };

  const clearIntervalId = (intervalId: NodeJS.Timeout | undefined) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  useEffect(() => {
    const toastId = reference.toBase58();
    if (drawer && !intervalId) {
      toast.loading("Waiting for payment...", {
        id: toastId,
        duration: Infinity,
      });

      const interval = setInterval(async () => {
        setIntervalId(interval);
        const signatures = await connection.getSignaturesForAddress(reference, {
          limit: 1,
        });

        if (signatures.length) {
          generate();
          clearIntervalId(interval);
          setDrawer(false);
          toast.success("Payment received!", {
            id: toastId,
            duration: 4000,
          });
        }
      }, 1000);
    } else if (!drawer && intervalId) {
      clearIntervalId(intervalId);
      toast.dismiss(toastId);
    }
  }, [reference, drawer]);

  return (
    <>
      <div className="space-y-3">
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
              <Image
                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${product.publicKey.toBase58()}&size=150`}
                alt={product.account.name}
                fill
                className="transition-all hover:scale-105"
                loader={({ src }) => src}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>
              <Link
                href={explorerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Product
              </Link>
            </ContextMenuItem>
            <ContextMenuItem onClick={handlePurchase}>Purchase</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">
            <Link href={explorerLink} target="_blank" rel="noopener noreferrer">
              {product.account.name}
            </Link>
          </h3>
          <p className="text-xs text-muted-foreground">
            {getSOL(product.account.price.toString())} {"\u25CE"}
          </p>
          <Button className="w-full" size="sm" onClick={handlePurchase}>
            Purchase
          </Button>
        </div>
      </div>

      <Drawer
        open={drawer}
        onOpenChange={(open) => {
          if (!open && drawer && !confirm("Are you sure you want to close?")) {
            return;
          }
          setDrawer(open);
        }}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                {product.account.name} (
                <Link
                  href={explorerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {product.publicKey.toBase58().slice(0, 4)}...
                  {product.publicKey.toBase58().slice(-4)}
                </Link>
                )
              </DrawerTitle>
              <DrawerDescription>
                {getSOL(product.account.price.toString())} {"\u25CE"}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <QRCode
                url={`solana:${
                  window.location.origin
                }/api/s/${product.account.store.toBase58()}/p/${product.publicKey.toBase58()}/ref/${reference.toBase58()}`}
              />
            </div>
            <DrawerFooter>
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
