use anchor_lang::prelude::*;

#[account]
pub struct Order {
    pub buyer: Pubkey,
    pub product: Pubkey,
    pub meta: String,
    pub bump: u8,
}

impl Order {
    pub const SIZE_WITHOUT_META: usize = 8 + // Anchor account discriminator
        32 + // product
        32 + // buyer
        1; // bump

    pub fn create(&mut self, buyer: Pubkey, product: Pubkey, meta: String, bump: u8) -> Result<()> {
        self.buyer = buyer;
        self.product = product;
        self.set_meta(meta)?;
        self.bump = bump;

        Ok(())
    }

    pub fn set_meta(&mut self, meta: String) -> Result<()> {
        self.meta = meta;

        Ok(())
    }
}
