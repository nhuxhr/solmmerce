use crate::constants;
use crate::state::{order::Order, product::Product, review::Review, store::Store, vault::Vault};
use anchor_lang::prelude::*;

// Vault accounts
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        space = Vault::SIZE,
        seeds = [constants::VAULT_SEED],
        bump
    )]
    pub vault: Account<'info, Vault>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VaultAuthority<'info> {
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority, seeds = [constants::VAULT_SEED], bump = vault.bump)]
    pub vault: Account<'info, Vault>,
}

#[derive(Accounts)]
pub struct WithdrawerAuthority<'info> {
    #[account(mut)]
    pub withdrawer: Signer<'info>,
    #[account(mut, has_one = withdrawer, seeds = [constants::VAULT_SEED], bump = vault.bump)]
    pub vault: Account<'info, Vault>,
}

// Store accounts
#[derive(Accounts)]
#[instruction(name: String, meta: String)]
pub struct CreateStore<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut, seeds = [constants::VAULT_SEED], bump = vault.bump)]
    pub vault: Account<'info, Vault>,
    #[account(
        init,
        constraint = name.len() <= 64,
        payer = signer,
        space = Store::SIZE_WITHOUT_NAME_AND_META + // Store size without name and meta
            (4 + name.len()) + // Store name size
            (4 + meta.len()), // Store meta size
        seeds = [constants::STORE_SEED, signer.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub store: Account<'info, Store>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(meta: String)]
pub struct UpdateStoreMeta<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        realloc = Store::SIZE_WITHOUT_NAME_AND_META + // Store size without name and meta
            (4 + store.name.len()) + // Store name size
            (4 + meta.len()), // Store meta size
        realloc::zero = true,
        realloc::payer = owner,
        has_one = owner,
        seeds = [constants::STORE_SEED, owner.key().as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    pub store: Account<'info, Store>,
    pub system_program: Program<'info, System>,
}

// Product accounts
#[derive(Accounts)]
#[instruction(name: String, price: u64, meta: String)]
pub struct CreateProduct<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        has_one = owner,
        seeds = [constants::STORE_SEED, owner.key().as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    pub store: Account<'info, Store>,
    #[account(
        init,
        constraint = name.len() <= 64,
        payer = owner,
        space = Product::SIZE_WITHOUT_NAME_AND_META + // Product size without name and meta
            (4 + name.len()) + // Product name size
            (4 + meta.len()), // Product meta size
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub product: Account<'info, Product>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProduct<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        has_one = owner,
        seeds = [constants::STORE_SEED, owner.key().as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    store: Account<'info, Store>,
    #[account(
        mut,
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), product.name.as_bytes()],
        bump = product.bump
    )]
    pub product: Account<'info, Product>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(meta: String)]
pub struct UpdateProductMeta<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        has_one = owner,
        seeds = [constants::STORE_SEED, owner.key().as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    store: Account<'info, Store>,
    #[account(
        mut,
        realloc = Product::SIZE_WITHOUT_NAME_AND_META + // Product size without name and meta
            (4 + product.name.len()) + // Product name size
            (4 + meta.len()), // Product meta size
        realloc::zero = true,
        realloc::payer = owner,
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), product.name.as_bytes()],
        bump = product.bump
    )]
    pub product: Account<'info, Product>,
    pub system_program: Program<'info, System>,
}

// Order accounts
#[derive(Accounts)]
#[instruction(meta: String)]
pub struct CreateOrder<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut, seeds = [constants::VAULT_SEED], bump = vault.bump)]
    pub vault: Account<'info, Vault>,
    /// CHECK: This is not dangerous because it has been manually checked
    #[account(mut)]
    pub owner: UncheckedAccount<'info>,
    #[account(
        has_one = owner,
        seeds = [constants::STORE_SEED, owner.key().as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    pub store: Account<'info, Store>,
    #[account(
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), product.name.as_bytes()],
        bump = product.bump
    )]
    pub product: Account<'info, Product>,
    #[account(
        init,
        payer = buyer,
        space = Order::SIZE_WITHOUT_META + // Order size without meta
            (4 + meta.len()), // Order meta size
        seeds = [constants::ORDER_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump
    )]
    pub order: Account<'info, Order>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(meta: String)]
pub struct UpdateOrderMeta<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(
        seeds = [constants::STORE_SEED, store.owner.as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    pub store: Account<'info, Store>,
    #[account(
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), product.name.as_bytes()],
        bump = product.bump
    )]
    pub product: Account<'info, Product>,
    #[account(
        mut,
        realloc = Order::SIZE_WITHOUT_META + // Order size without meta
            (4 + meta.len()), // Order meta size
        realloc::zero = true,
        realloc::payer = buyer,
        seeds = [constants::ORDER_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump = order.bump
    )]
    pub order: Account<'info, Order>,
    pub system_program: Program<'info, System>,
}

// Review accounts
#[derive(Accounts)]
#[instruction(rating: u8, comment: String, meta: String)]
pub struct CreateReview<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(
        seeds = [constants::STORE_SEED, store.owner.as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    pub store: Account<'info, Store>,
    #[account(
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), product.name.as_bytes()],
        bump = product.bump
    )]
    pub product: Account<'info, Product>,
    #[account(
        has_one = buyer,
        seeds = [constants::ORDER_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump = order.bump
    )]
    pub order: Account<'info, Order>,
    #[account(
        init,
        payer = buyer,
        space = Review::SIZE_WITHOUT_COMMENT_AND_META + // Review size without comment and meta
            (4 + comment.len()) + // Review comment size
            (4 + meta.len()), // Review meta size
        seeds = [constants::REVIEW_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump
    )]
    pub review: Account<'info, Review>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateReview<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(
        seeds = [constants::STORE_SEED, store.owner.as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    pub store: Account<'info, Store>,
    #[account(
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), product.name.as_bytes()],
        bump = product.bump
    )]
    pub product: Account<'info, Product>,
    #[account(
        has_one = buyer,
        seeds = [constants::ORDER_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump = order.bump
    )]
    pub order: Account<'info, Order>,
    #[account(
        mut,
        seeds = [constants::REVIEW_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump = review.bump
    )]
    pub review: Account<'info, Review>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(meta: String)]
pub struct UpdateReviewMeta<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(
        seeds = [constants::STORE_SEED, store.owner.as_ref(), store.name.as_bytes()],
        bump = store.bump
    )]
    pub store: Account<'info, Store>,
    #[account(
        seeds = [constants::PRODUCT_SEED, store.key().as_ref(), product.name.as_bytes()],
        bump = product.bump
    )]
    pub product: Account<'info, Product>,
    #[account(
        has_one = buyer,
        seeds = [constants::ORDER_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump = order.bump
    )]
    pub order: Account<'info, Order>,
    #[account(
        mut,
        realloc = Review::SIZE_WITHOUT_COMMENT_AND_META + // Review size without comment and meta
            (4 + review.comment.len()) + // Review comment size
            (4 + meta.len()), // Review meta size
        realloc::zero = true,
        realloc::payer = buyer,
        seeds = [constants::REVIEW_SEED, buyer.key().as_ref(), product.key().as_ref()],
        bump = review.bump
    )]
    pub review: Account<'info, Review>,
    pub system_program: Program<'info, System>,
}
