use anchor_lang::prelude::*;

#[account]
pub struct Store {
    pub owner: Pubkey,
    pub name: String,
    pub meta: String,
    pub bump: u8,
}

impl Store {
    pub const SIZE_WITHOUT_NAME_AND_META: usize = 8 + // Anchor account discriminator
        32 + // owner
        1; // bump

    pub fn create(&mut self, owner: Pubkey, name: String, meta: String, bump: u8) -> Result<()> {
        self.owner = owner;
        self.name = name;
        self.set_meta(meta)?;
        self.bump = bump;

        Ok(())
    }

    pub fn set_meta(&mut self, meta: String) -> Result<()> {
        self.meta = meta;

        Ok(())
    }
}
