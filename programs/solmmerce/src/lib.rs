use anchor_lang::{prelude::*, system_program};

use account::*;
use errors::*;
use state::vault::Vault;

pub mod account;
pub mod constants;
pub mod errors;
pub mod state;

#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "Solmmerce",
    project_url: "https://solmmerce.com",
    contacts: "twitter:nhuxhr,telegram:nhuxhr",
    policy: "https://github.com/nhuxhr/solmmerce/blob/master/SECURITY.md",
    preferred_languages: "en",
    source_code: "https://github.com/nhuxhr/solmmerce"
}

declare_id!("2AcCviVANT7SFU7hVhBL2rWZ5maCupvNEM6xFDuPi19n");

#[program]
pub mod solmmerce {
    use super::*;

    // Vault instructions
    pub fn initialize(ctx: Context<Initialize>, withdrawer: Pubkey, fees: [u64; 2]) -> Result<()> {
        let authority: Pubkey = *ctx.accounts.signer.key;
        let bump: u8 = ctx.bumps.vault;
        ctx.accounts.vault.init(authority, withdrawer, fees, bump)
    }

    pub fn set_authority(ctx: Context<VaultAuthority>, authority: Pubkey) -> Result<()> {
        ctx.accounts.vault.set_authority(authority)
    }

    pub fn set_withdrawer(ctx: Context<VaultAuthority>, withdrawer: Pubkey) -> Result<()> {
        ctx.accounts.vault.set_withdrawer(withdrawer)
    }

    pub fn set_fees(ctx: Context<VaultAuthority>, fees: [u64; 2]) -> Result<()> {
        ctx.accounts.vault.set_fees(fees)
    }

    pub fn withdraw(ctx: Context<WithdrawerAuthority>, amount: u64) -> Result<()> {
        require!(amount > 0, SMMError::InvalidVaultWithdrawAmount);

        let rent: u64 = 1510320_u64;
        let balance: u64 = ctx.accounts.vault.get_lamports();
        require!(amount <= balance, SMMError::InsufficientVaultFunds);
        require!(
            balance - amount >= rent,
            SMMError::CannotWithdrawVaultAccountRent
        );

        let vault: &Account<Vault> = &ctx.accounts.vault;
        let withdrawer: &Signer = &ctx.accounts.withdrawer;

        **vault.to_account_info().try_borrow_mut_lamports()? -= amount;
        **withdrawer.to_account_info().try_borrow_mut_lamports()? += amount;

        Ok(())
    }

    // Store instructions
    pub fn create_store(ctx: Context<CreateStore>, name: String, meta: String) -> Result<()> {
        let owner: Pubkey = ctx.accounts.signer.key();
        let bump: u8 = ctx.bumps.store;
        ctx.accounts.store.create(owner, name, meta, bump)?;

        let fee: &u64 = ctx.accounts.vault.fees.first().unwrap();
        let vault: &Account<Vault> = &ctx.accounts.vault;
        let signer: &Signer = &ctx.accounts.signer;

        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: signer.to_account_info(),
                    to: vault.to_account_info(),
                },
            ),
            *fee,
        )?;

        Ok(())
    }

    pub fn set_store_meta(ctx: Context<UpdateStoreMeta>, meta: String) -> Result<()> {
        ctx.accounts.store.set_meta(meta)
    }

    // Product instructions
    pub fn create_product(
        ctx: Context<CreateProduct>,
        name: String,
        price: u64,
        meta: String,
    ) -> Result<()> {
        let store: Pubkey = ctx.accounts.store.key();
        let bump: u8 = ctx.bumps.product;
        ctx.accounts.product.create(store, name, price, meta, bump)
    }

    pub fn set_product_price(ctx: Context<UpdateProduct>, price: u64) -> Result<()> {
        ctx.accounts.product.set_price(price)
    }

    pub fn set_product_meta(ctx: Context<UpdateProductMeta>, meta: String) -> Result<()> {
        ctx.accounts.product.set_meta(meta)
    }

    // Order instructions
    pub fn create_order(ctx: Context<CreateOrder>, meta: String) -> Result<()> {
        let buyer: Pubkey = ctx.accounts.buyer.key();
        let product: Pubkey = ctx.accounts.product.key();
        let bump: u8 = ctx.bumps.order;
        ctx.accounts.order.create(buyer, product, meta, bump)?;

        let price: u64 = ctx.accounts.product.price;
        let order_fee: &u64 = ctx.accounts.vault.fees.last().unwrap();
        let fee: u64 = ((order_fee / 1000) as f32 * (price) as f32) as u64;
        let vault: &Account<Vault> = &ctx.accounts.vault;
        let owner: &AccountInfo = &ctx.accounts.owner;
        let signer: &Signer = &ctx.accounts.buyer;

        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: signer.to_account_info(),
                    to: owner.to_account_info(),
                },
            ),
            price - fee,
        )?;

        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: signer.to_account_info(),
                    to: vault.to_account_info(),
                },
            ),
            fee,
        )?;

        Ok(())
    }

    pub fn set_order_meta(ctx: Context<UpdateOrderMeta>, meta: String) -> Result<()> {
        ctx.accounts.order.set_meta(meta)
    }

    // Review instructions
    pub fn create_review(
        ctx: Context<CreateReview>,
        rating: u8,
        comment: String,
        meta: String,
    ) -> Result<()> {
        let order: Pubkey = ctx.accounts.order.key();
        let bump: u8 = ctx.bumps.review;
        ctx.accounts
            .review
            .create(order, rating, comment, meta, bump)
    }

    pub fn set_review_rating(ctx: Context<UpdateReview>, rating: u8) -> Result<()> {
        ctx.accounts.review.set_rating(rating)
    }

    pub fn set_review_comment(ctx: Context<UpdateReview>, comment: String) -> Result<()> {
        ctx.accounts.review.set_comment(comment)
    }

    pub fn set_review_meta(ctx: Context<UpdateReviewMeta>, meta: String) -> Result<()> {
        ctx.accounts.review.set_meta(meta)
    }
}
