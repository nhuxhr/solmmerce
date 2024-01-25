import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solmmerce } from "../target/types/solmmerce";

describe("solmmerce", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const web3 = anchor.web3;
  const payer = provider.wallet as anchor.Wallet;
  const program = anchor.workspace.Solmmerce as Program<Solmmerce>;

  // Dummy Accounts
  const accounts = {
    foo: anchor.web3.Keypair.fromSecretKey(
      new Uint8Array([
        35, 150, 42, 255, 119, 47, 103, 114, 159, 132, 221, 148, 35, 28, 139,
        145, 143, 250, 244, 199, 46, 82, 197, 178, 198, 91, 148, 152, 50, 72,
        101, 134, 79, 100, 74, 52, 49, 6, 82, 129, 215, 51, 184, 153, 248, 145,
        115, 109, 196, 142, 60, 54, 57, 206, 222, 230, 189, 57, 128, 39, 1, 201,
        96, 237,
      ])
    ),
    bar: anchor.web3.Keypair.fromSecretKey(
      new Uint8Array([
        124, 235, 61, 34, 231, 229, 113, 189, 252, 216, 195, 219, 190, 247, 86,
        82, 102, 77, 103, 51, 21, 99, 27, 113, 175, 76, 195, 112, 35, 197, 62,
        131, 77, 95, 78, 154, 212, 56, 126, 230, 159, 6, 75, 181, 26, 171, 173,
        104, 196, 65, 71, 153, 184, 56, 21, 1, 206, 150, 32, 232, 84, 123, 160,
        6,
      ])
    ),
  };

  const buffers = {
    seeds: {
      vault: Buffer.from("vault"),
      store: Buffer.from("store"),
      product: Buffer.from("product"),
      order: Buffer.from("order"),
      review: Buffer.from("review"),
    },
    store: {
      name: Buffer.from(`My Store ${Date.now()}`),
      meta: Buffer.from(JSON.stringify({})),
    },
    product: {
      name: Buffer.from(`My Product ${Date.now()}`),
      meta: Buffer.from(JSON.stringify({})),
    },
    order: {
      meta: Buffer.from(JSON.stringify({})),
    },
    review: {
      comment: Buffer.from("Great product!"),
      meta: Buffer.from(JSON.stringify({})),
    },
  };

  // Program PDAs
  const [vault] = web3.PublicKey.findProgramAddressSync(
    [buffers.seeds.vault],
    program.programId
  );
  const [store] = web3.PublicKey.findProgramAddressSync(
    [buffers.seeds.store, payer.publicKey.toBuffer(), buffers.store.name],
    program.programId
  );
  const [product] = web3.PublicKey.findProgramAddressSync(
    [buffers.seeds.product, store.toBuffer(), buffers.product.name],
    program.programId
  );
  const [order] = web3.PublicKey.findProgramAddressSync(
    [buffers.seeds.order, payer.publicKey.toBuffer(), product.toBuffer()],
    program.programId
  );
  const [review] = web3.PublicKey.findProgramAddressSync(
    [buffers.seeds.review, payer.publicKey.toBuffer(), product.toBuffer()],
    program.programId
  );

  // Log out addresses for debugging purposes.
  console.table({
    "Program ID": program.programId.toBase58(),
    "Payer Address": payer.publicKey.toBase58(),
    "Account(foo)": accounts.foo.publicKey.toBase58(),
    "Account(bar)": accounts.bar.publicKey.toBase58(),
    "Vault PDA": vault.toBase58(),
    "Store PDA": store.toBase58(),
    "Product PDA": product.toBase58(),
    "Order PDA": order.toBase58(),
    "Review PDA": review.toBase58(),
  });

  // Instructions (i.e. initialize, set_authority, set_withdrawer, set_fees, withdraw, create_store, set_store_meta, create_product, set_product_price, set_product_meta, create_order, set_order_meta, create_review, set_review_rating, set_review_comment, set_review_meta)

  beforeAll(async () => {
    const lamports = web3.LAMPORTS_PER_SOL;
    const amount = 100 * lamports;
    await Promise.allSettled(
      Object.values(accounts).map(async (account) => {
        const balance = await provider.connection.getBalance(account.publicKey);
        if (balance > amount) return;
        const topUp = amount - balance;
        return provider.connection.requestAirdrop(account.publicKey, topUp);
      })
    );
  });

  it("Is initialized!", async () => {
    try {
      const vaultAccount = await program.account.vault.fetch(vault);
      expect(vaultAccount.authority).toEqual(payer.publicKey);
    } catch (error) {
      const fees = [
        new anchor.BN(web3.LAMPORTS_PER_SOL / 2), // Create store fee: 0.5 SOL
        new anchor.BN(5), // Order fee: 0.5% of the order value. Factor of 1000
      ];
      await program.methods
        .initialize(payer.publicKey, fees)
        .accounts({ vault })
        .signers([payer.payer])
        .rpc();
      const vaultAccount = await program.account.vault.fetch(vault);
      expect(vaultAccount.authority).toEqual(payer.publicKey);
    }
  });

  describe("Set Authority", () => {
    it("Transfer authority to foo", async () => {
      await program.methods
        .setAuthority(accounts.foo.publicKey)
        .accounts({ vault })
        .signers([payer.payer])
        .rpc();
      const vaultAccount = await program.account.vault.fetch(vault);
      expect(vaultAccount.authority).toEqual(accounts.foo.publicKey);
    });

    it("Transfer authority back to payer", async () => {
      await program.methods
        .setAuthority(payer.publicKey)
        .accounts({ authority: accounts.foo.publicKey, vault })
        .signers([accounts.foo])
        .rpc();
      const vaultAccount = await program.account.vault.fetch(vault);
      expect(vaultAccount.authority).toEqual(payer.publicKey);
    });

    it("Should fail if not called by authority", async () => {
      await expect(
        program.methods
          .setAuthority(accounts.foo.publicKey)
          .accounts({ vault })
          .signers([accounts.bar])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Withdrawer", () => {
    it("Transfer withdrawer to foo", async () => {
      await program.methods
        .setWithdrawer(accounts.foo.publicKey)
        .accounts({ vault })
        .signers([payer.payer])
        .rpc();
      const vaultAccount = await program.account.vault.fetch(vault);
      expect(vaultAccount.withdrawer).toEqual(accounts.foo.publicKey);
    });

    it("Transfer withdrawer back to payer", async () => {
      await program.methods
        .setWithdrawer(payer.publicKey)
        .accounts({ vault })
        .signers([payer.payer])
        .rpc();
      const vaultAccount = await program.account.vault.fetch(vault);
      expect(vaultAccount.withdrawer).toEqual(payer.publicKey);
    });

    it("Should fail if not called by authority", async () => {
      await expect(
        program.methods
          .setWithdrawer(accounts.foo.publicKey)
          .accounts({ vault })
          .signers([accounts.bar])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Fees", () => {
    it("Set fees", async () => {
      const fees = [
        new anchor.BN(web3.LAMPORTS_PER_SOL / 4), // Create store fee: 0.25 SOL
        new anchor.BN(4), // Order fee: 0.4% of the order value. Factor of 1000
      ];
      await program.methods
        .setFees(fees)
        .accounts({ vault })
        .signers([payer.payer])
        .rpc();
      const vaultAccount = await program.account.vault.fetch(vault);
      expect(vaultAccount.fees.map((fee) => fee.toString())).toEqual(
        fees.map((fee) => fee.toString())
      );
    });

    it("Should fail if order fee is greater than 1000", async () => {
      const fees = [
        new anchor.BN(web3.LAMPORTS_PER_SOL / 2), // Create store fee: 0.5 SOL
        new anchor.BN(1001), // Order fee: 100.1% of the order value. Factor of 1000
      ];
      await expect(
        program.methods
          .setFees(fees)
          .accounts({ vault })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by authority", async () => {
      const fees = [
        new anchor.BN(web3.LAMPORTS_PER_SOL / 2), // Create store fee: 0.5 SOL
        new anchor.BN(5), // Order fee: 0.5% of the order value. Factor of 1000
      ];
      await expect(
        program.methods
          .setFees(fees)
          .accounts({ vault })
          .signers([accounts.bar])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Withdraw", () => {
    let rent = 1510320;
    let vaultBalance: number;

    beforeAll(async () => {
      vaultBalance = (await provider.connection.getBalance(vault)) - rent;
    });

    it("Send 1 SOL to vault if balance is zero", async () => {
      if (vaultBalance > 0) return;
      const tx = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: vault,
          lamports: web3.LAMPORTS_PER_SOL,
        })
      );
      await web3.sendAndConfirmTransaction(provider.connection, tx, [
        payer.payer,
      ]);
      const balance = await provider.connection.getBalance(vault);
      vaultBalance = balance - rent;
      expect(balance >= web3.LAMPORTS_PER_SOL);
    });

    it("Withdraw SOL from vault", async () => {
      await program.methods
        .withdraw(new anchor.BN(vaultBalance))
        .accounts({ vault })
        .signers([payer.payer])
        .rpc();
      const balance = await provider.connection.getBalance(vault);
      expect(balance).toEqual(rent);
    });

    it("Should fail when amount is zero", async () => {
      await expect(
        program.methods
          .withdraw(new anchor.BN(0))
          .accounts({ vault })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail when amount is greater than balance", async () => {
      await expect(
        program.methods
          .withdraw(new anchor.BN(web3.LAMPORTS_PER_SOL))
          .accounts({ vault })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail to withdraw rent", async () => {
      await expect(
        program.methods
          .withdraw(new anchor.BN(1))
          .accounts({ vault })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail when signer is not authority", async () => {
      await expect(
        program.methods
          .withdraw(new anchor.BN(1))
          .accounts({ vault })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Create Store", () => {
    it("Create store", async () => {
      await program.methods
        .createStore(
          buffers.store.name.toString(),
          buffers.store.meta.toString()
        )
        .accounts({
          vault,
          store,
        })
        .signers([payer.payer])
        .rpc();
      const storeAccount = await program.account.store.fetch(store);
      expect(storeAccount.owner.toBase58()).toEqual(payer.publicKey.toBase58());
      expect(storeAccount.name).toEqual(buffers.store.name.toString());
      expect(storeAccount.meta).toEqual(buffers.store.meta.toString());
    });

    it("Should fail if store already exists", async () => {
      await expect(
        program.methods
          .createStore(
            buffers.store.name.toString(),
            buffers.store.meta.toString()
          )
          .accounts({
            vault,
            store,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Store Meta", () => {
    it("Set store meta", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await program.methods
        .setStoreMeta(meta)
        .accounts({
          store,
        })
        .signers([payer.payer])
        .rpc();
      const storeAccount = await program.account.store.fetch(store);
      expect(storeAccount.meta).toEqual(meta.toString());
    });

    it("Should fail if store does not exist", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setStoreMeta(meta)
          .accounts({
            store: accounts.foo.publicKey,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by store owner", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setStoreMeta(meta)
          .accounts({
            store,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Create Product", () => {
    it("Create product", async () => {
      await program.methods
        .createProduct(
          buffers.product.name.toString(),
          new anchor.BN(web3.LAMPORTS_PER_SOL),
          buffers.product.meta.toString()
        )
        .accounts({
          store,
          product,
        })
        .signers([payer.payer])
        .rpc();
      const productAccount = await program.account.product.fetch(product);
      expect(productAccount.store).toEqual(store);
      expect(productAccount.name).toEqual(buffers.product.name.toString());
      expect(productAccount.price.toString()).toEqual(
        web3.LAMPORTS_PER_SOL.toString()
      );
      expect(productAccount.meta).toEqual(buffers.product.meta.toString());
    });

    it("Should fail if product already exists", async () => {
      await expect(
        program.methods
          .createProduct(
            buffers.product.name.toString(),
            new anchor.BN(web3.LAMPORTS_PER_SOL),
            buffers.product.meta.toString()
          )
          .accounts({
            store,
            product,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if store does not exist", async () => {
      await expect(
        program.methods
          .createProduct(
            buffers.product.name.toString(),
            new anchor.BN(web3.LAMPORTS_PER_SOL),
            buffers.product.meta.toString()
          )
          .accounts({
            store: accounts.foo.publicKey,
            product,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Product Price", () => {
    it("Set product price", async () => {
      await program.methods
        .setProductPrice(new anchor.BN(web3.LAMPORTS_PER_SOL * 2))
        .accounts({
          store,
          product,
        })
        .signers([payer.payer])
        .rpc();
      const productAccount = await program.account.product.fetch(product);
      expect(productAccount.price.toString()).toEqual(
        (web3.LAMPORTS_PER_SOL * 2).toString()
      );
    });

    it("Should fail if product does not exist", async () => {
      await expect(
        program.methods
          .setProductPrice(new anchor.BN(web3.LAMPORTS_PER_SOL * 2))
          .accounts({
            store,
            product: accounts.foo.publicKey,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by store owner", async () => {
      await expect(
        program.methods
          .setProductPrice(new anchor.BN(web3.LAMPORTS_PER_SOL * 2))
          .accounts({
            store,
            product,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Product Meta", () => {
    it("Set product meta", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await program.methods
        .setProductMeta(meta)
        .accounts({
          store,
          product,
        })
        .signers([payer.payer])
        .rpc();
      const productAccount = await program.account.product.fetch(product);
      expect(productAccount.meta).toEqual(meta.toString());
    });

    it("Should fail if product does not exist", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setProductMeta(meta)
          .accounts({
            store,
            product: accounts.foo.publicKey,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by store owner", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setProductMeta(meta)
          .accounts({
            store,
            product,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Create Order", () => {
    it("Create order", async () => {
      await program.methods
        .createOrder(buffers.order.meta.toString())
        .accounts({
          vault,
          owner: payer.publicKey,
          store,
          product,
          order,
        })
        .signers([payer.payer])
        .rpc();
      const orderAccount = await program.account.order.fetch(order);
      expect(orderAccount.product).toEqual(product);
      expect(orderAccount.meta).toEqual(buffers.order.meta.toString());
    });

    it("Should fail if order already exists", async () => {
      await expect(
        program.methods
          .createOrder(buffers.order.meta.toString())
          .accounts({
            vault,
            owner: payer.publicKey,
            store,
            product,
            order,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if store does not exist", async () => {
      await expect(
        program.methods
          .createOrder(buffers.order.meta.toString())
          .accounts({
            vault,
            owner: payer.publicKey,
            store: accounts.foo.publicKey,
            product,
            order,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if owner is not the store owner", async () => {
      await expect(
        program.methods
          .createOrder(buffers.order.meta.toString())
          .accounts({
            vault,
            owner: accounts.foo.publicKey,
            store,
            product,
            order,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if product does not exist", async () => {
      await expect(
        program.methods
          .createOrder(buffers.order.meta.toString())
          .accounts({
            vault,
            owner: payer.publicKey,
            store,
            product: accounts.foo.publicKey,
            order,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Order Meta", () => {
    it("Set order meta", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await program.methods
        .setOrderMeta(meta)
        .accounts({
          store,
          product,
          order,
        })
        .signers([payer.payer])
        .rpc();
      const orderAccount = await program.account.order.fetch(order);
      expect(orderAccount.meta).toEqual(meta.toString());
    });

    it("Should fail if order does not exist", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setOrderMeta(meta)
          .accounts({
            store,
            product,
            order: accounts.foo.publicKey,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by order owner", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setOrderMeta(meta)
          .accounts({
            store,
            product,
            order,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Create Review", () => {
    it("Should fail if order owner is creating review", async () => {
      await expect(
        program.methods
          .createReview(
            5,
            buffers.review.comment.toString(),
            buffers.review.meta.toString()
          )
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if order rating is less than 1", async () => {
      await expect(
        program.methods
          .createReview(
            0,
            buffers.review.comment.toString(),
            buffers.review.meta.toString()
          )
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if order rating is greater than 5", async () => {
      await expect(
        program.methods
          .createReview(
            6,
            buffers.review.comment.toString(),
            buffers.review.meta.toString()
          )
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if order does not exist", async () => {
      await expect(
        program.methods
          .createReview(
            5,
            buffers.review.comment.toString(),
            buffers.review.meta.toString()
          )
          .accounts({
            store,
            product,
            order: accounts.foo.publicKey,
            review,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Create review", async () => {
      await program.methods
        .createReview(
          5,
          buffers.review.comment.toString(),
          buffers.review.meta.toString()
        )
        .accounts({
          store,
          product,
          order,
          review,
        })
        .signers([payer.payer])
        .rpc();
      const reviewAccount = await program.account.review.fetch(review);
      expect(reviewAccount.order).toEqual(order);
      expect(reviewAccount.rating).toEqual(5);
      expect(reviewAccount.comment).toEqual(buffers.review.comment.toString());
      expect(reviewAccount.meta).toEqual(buffers.review.meta.toString());
    });

    it("Should fail if review already exists", async () => {
      await expect(
        program.methods
          .createReview(
            5,
            buffers.review.comment.toString(),
            buffers.review.meta.toString()
          )
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Review Rating", () => {
    it("Set review rating", async () => {
      await program.methods
        .setReviewRating(4)
        .accounts({
          store,
          product,
          order,
          review,
        })
        .signers([payer.payer])
        .rpc();
      const reviewAccount = await program.account.review.fetch(review);
      expect(reviewAccount.rating).toEqual(4);
    });

    it("Should fail if review does not exist", async () => {
      await expect(
        program.methods
          .setReviewRating(4)
          .accounts({
            store,
            product,
            order,
            review: accounts.foo.publicKey,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by review owner", async () => {
      await expect(
        program.methods
          .setReviewRating(4)
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if rating is less than 1", async () => {
      await expect(
        program.methods
          .setReviewRating(0)
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if rating is greater than 5", async () => {
      await expect(
        program.methods
          .setReviewRating(6)
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Review Comment", () => {
    it("Set review comment", async () => {
      const comment = "New comment";
      await program.methods
        .setReviewComment(comment)
        .accounts({
          store,
          product,
          order,
          review,
        })
        .signers([payer.payer])
        .rpc();
      const reviewAccount = await program.account.review.fetch(review);
      expect(reviewAccount.comment).toEqual(comment);
    });

    it("Should fail if review does not exist", async () => {
      const comment = "New comment";
      await expect(
        program.methods
          .setReviewComment(comment)
          .accounts({
            store,
            product,
            order,
            review: accounts.foo.publicKey,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by review owner", async () => {
      const comment = "New comment";
      await expect(
        program.methods
          .setReviewComment(comment)
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });
  });

  describe("Set Review Meta", () => {
    it("Set review meta", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await program.methods
        .setReviewMeta(meta)
        .accounts({
          store,
          product,
          order,
          review,
        })
        .signers([payer.payer])
        .rpc();
      const reviewAccount = await program.account.review.fetch(review);
      expect(reviewAccount.meta).toEqual(meta.toString());
    });

    it("Should fail if review does not exist", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setReviewMeta(meta)
          .accounts({
            store,
            product,
            order,
            review: accounts.foo.publicKey,
          })
          .signers([payer.payer])
          .rpc()
      ).rejects.toThrow();
    });

    it("Should fail if not called by review owner", async () => {
      const meta = JSON.stringify({ foo: "bar" });
      await expect(
        program.methods
          .setReviewMeta(meta)
          .accounts({
            store,
            product,
            order,
            review,
          })
          .signers([accounts.foo])
          .rpc()
      ).rejects.toThrow();
    });
  });
});
