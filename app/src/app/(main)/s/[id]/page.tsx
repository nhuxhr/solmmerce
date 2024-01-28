"use client";

import React from "react";
import { Package } from "lucide-react";

import ProductCard from "@/components/cards/product";
import useProducts from "@/hooks/use-products";

import { useStore } from "./contexts/store";

export default function Page() {
  const store = useStore();
  const { data: products } = useProducts(store.publicKey);

  return (
    <>
      {products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-10 gap-4">
          {products.map((product) => (
            <ProductCard key={product.publicKey.toBase58()} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <Package className="h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">No products in store</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Store owner has not added any products yet.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
