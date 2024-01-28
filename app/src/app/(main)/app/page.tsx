"use client";

import React from "react";
import { Plus, Store } from "lucide-react";

import CreateStoreButton from "@/components/create-store-button";
import useStores from "@/hooks/use-stores";
import StoreCard from "@/components/cards/store";

export default function Page() {
  const { data: stores } = useStores();

  return (
    <>
      {stores.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-10 gap-4">
          <div className="space-y-3">
            <CreateStoreButton>
              <button
                type="button"
                className="w-full aspect-square flex items-center justify-center rounded-md border-2 border-dashed"
              >
                <Plus className="h-10 w-10 text-muted-foreground" />
              </button>
            </CreateStoreButton>

            <div className="space-y-1 text-sm">
              <h3 className="font-medium leading-none">Create Store</h3>
              <p className="text-xs text-muted-foreground">
                Create a new store to start selling your products.
              </p>
            </div>
          </div>

          {stores.map((store) => (
            <StoreCard key={store.publicKey.toBase58()} store={store} />
          ))}
        </div>
      ) : (
        <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <Store className="h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">No stores</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Create a store to get started. You can create multiple stores.
            </p>

            <CreateStoreButton />
          </div>
        </div>
      )}
    </>
  );
}
