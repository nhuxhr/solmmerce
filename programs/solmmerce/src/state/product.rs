use anchor_lang::prelude::*;

#[account]
pub struct Product {
    pub store: Pubkey,
    pub name: String,
    pub price: u64,
    pub meta: String,
    pub bump: u8,
}

impl Product {
    pub const SIZE_WITHOUT_NAME_AND_META: usize = 8 + // Anchor account discriminator
        32 + // store
        8 + // price
        1; // bump

    pub fn create(
        &mut self,
        store: Pubkey,
        name: String,
        price: u64,
        meta: String,
        bump: u8,
    ) -> Result<()> {
        self.store = store;
        self.name = name;
        self.set_price(price)?;
        self.set_meta(meta)?;
        self.bump = bump;

        Ok(())
    }

    pub fn set_price(&mut self, price: u64) -> Result<()> {
        self.price = price;

        Ok(())
    }

    pub fn set_meta(&mut self, meta: String) -> Result<()> {
        self.meta = meta;

        Ok(())
    }
}
