use anchor_lang::prelude::*;

declare_id!("2AcCviVANT7SFU7hVhBL2rWZ5maCupvNEM6xFDuPi19n");

#[program]
pub mod solmmerce {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
