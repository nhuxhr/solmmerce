import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import { getSolmmerceProgram } from "@/helpers/get-solmmerce-program";

type Context = {
  params: {
    store: string;
    product: string;
    ref: string;
  };
};

export const runtime: string = "edge";

async function getStore(address: string) {
  const program = getSolmmerceProgram();
  const publicKey = new PublicKey(address);
  const account = await program.account.store.fetch(publicKey);
  return { publicKey, account };
}

async function getProduct(address: string) {
  const program = getSolmmerceProgram();
  const publicKey = new PublicKey(address);
  const account = await program.account.product.fetch(publicKey);
  return { publicKey, account };
}

export async function GET(req: Request, ctx: Context) {
  const url = new URL(req.url);
  const store = await getStore(ctx.params.store);

  return new Response(
    JSON.stringify({
      label: store.account.name,
      icon: `${url.origin}/logo.svg`,
    })
  );
}

export async function POST(req: Request, ctx: Context) {
  const body = await req.json();
  const program = getSolmmerceProgram();
  const store = await getStore(ctx.params.store);
  const product = await getProduct(ctx.params.product);

  if (!body.account) throw new Error("Account is required");

  // Reference
  const ref = new PublicKey(ctx.params.ref);

  // Sender is the buyer
  const sender = new PublicKey(body.account);

  // TODO: Bug in finding program addresses "Error: Unable to find a viable program address nonce"

  // Find the vault and order PDAs
  const [vaultPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    program.programId
  );
  const [orderPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("order"),
      Buffer.from(sender.toBytes()),
      Buffer.from(product.publicKey.toBytes()),
    ],
    program.programId
  );

  // Create the order
  const meta = JSON.stringify({ createdAt: Date.now() / 1000 });
  // Create order instruction
  const ix = await program.methods
    .createOrder(meta)
    .accounts({
      buyer: sender,
      vault: vaultPda,
      owner: store.account.owner,
      store: store.publicKey,
      product: product.publicKey,
      order: orderPda,
      systemProgram: SystemProgram.programId,
    })
    .remainingAccounts([{ pubkey: ref, isSigner: false, isWritable: false }])
    .instruction();
  // Create the transaction
  const tx = new Transaction().add(ix);
  // Serialize the transaction
  const stx = tx.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  // Return the transaction and message to sign
  const transaction = Buffer.from(stx).toString("base64");
  const message = `Please confirm your order by signing this transaction for "${product.account.name}" at "${store.account.name}".`;

  return new Response(
    JSON.stringify({
      transaction,
      message,
    })
  );
}
