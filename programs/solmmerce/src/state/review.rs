use anchor_lang::prelude::*;

use crate::errors::*;

#[account]
pub struct Review {
    pub order: Pubkey,
    pub rating: u8,
    pub comment: String,
    pub meta: String,
    pub bump: u8,
}

impl Review {
    pub const SIZE_WITHOUT_COMMENT_AND_META: usize = 8 + // Anchor account discriminator
        32 + // order
        1 + // rating
        1; // bump

    pub fn create(
        &mut self,
        order: Pubkey,
        rating: u8,
        comment: String,
        meta: String,
        bump: u8,
    ) -> Result<()> {
        self.order = order;
        self.set_rating(rating)?;
        self.set_comment(comment)?;
        self.set_meta(meta)?;
        self.bump = bump;

        Ok(())
    }

    pub fn set_rating(&mut self, rating: u8) -> Result<()> {
        require!((1..=5).contains(&rating), SMMError::InvalidReviewRating);

        self.rating = rating;

        Ok(())
    }

    pub fn set_comment(&mut self, comment: String) -> Result<()> {
        self.comment = comment;

        Ok(())
    }

    pub fn set_meta(&mut self, meta: String) -> Result<()> {
        self.meta = meta;

        Ok(())
    }
}
