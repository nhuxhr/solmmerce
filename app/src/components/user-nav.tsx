"use client";

import { mutate } from "swr";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function UserNav() {
  const { connected, publicKey, disconnect } = useWallet();

  if (!connected) return null;

  const address = publicKey!.toBase58();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  const handleDisconnect = () => {
    disconnect();
    mutate(() => true, undefined, { revalidate: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${address}&size=80&background=%23fff`}
              alt={`${address.slice(0, 4)}...${address.slice(-4)}`}
            />
            <AvatarFallback>{address.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {address.slice(0, 4)}...{address.slice(-4)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`//explorer.solana.com/address/${address}?cluster=${process.env.NEXT_PUBLIC_CLUSTER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Solana Explorer
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyAddress}>
            Copy Address
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
