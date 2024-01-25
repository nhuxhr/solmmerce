use anchor_lang::prelude::*;

use crate::errors::*;

#[account]
#[derive(InitSpace)]
pub struct Vault {
    pub authority: Pubkey,
    pub withdrawer: Pubkey,
    pub fees: [u64; 2], // [create_store_fee, order_fee]
    pub bump: u8,
}

impl Vault {
    pub const SIZE: usize = 8 + // Anchor account discriminator
        Vault::INIT_SPACE; // From InitSpace trait

    pub fn init(
        &mut self,
        authority: Pubkey,
        withdrawer: Pubkey,
        fees: [u64; 2],
        bump: u8,
    ) -> Result<()> {
        self.authority = authority;
        self.withdrawer = withdrawer;
        self.set_fees(fees)?;
        self.bump = bump;

        Ok(())
    }

    pub fn set_authority(&mut self, authority: Pubkey) -> Result<()> {
        require_keys_neq!(self.authority, authority, SMMError::InvalidVaultAuthority);
        self.authority = authority;

        Ok(())
    }

    pub fn set_withdrawer(&mut self, withdrawer: Pubkey) -> Result<()> {
        require_keys_neq!(
            self.withdrawer,
            withdrawer,
            SMMError::InvalidVaultWithdrawer
        );
        self.withdrawer = withdrawer;

        Ok(())
    }

    pub fn set_fees(&mut self, fees: [u64; 2]) -> Result<()> {
        let order_fee: &u64 = fees.last().unwrap(); // Percentage. Factor of 1000.
        require!((0..=1000).contains(order_fee), SMMError::InvalidOrderFee);

        self.fees = fees;

        Ok(())
    }
}
