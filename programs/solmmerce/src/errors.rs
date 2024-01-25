use anchor_lang::prelude::*;

#[error_code]
pub enum SMMError {
    // Vault errors
    #[msg("Invalid Vault Authority")]
    InvalidVaultAuthority,
    #[msg("Invalid Vault Withdrawer")]
    InvalidVaultWithdrawer,
    #[msg("Invalid Vault Withdraw Amount")]
    InvalidVaultWithdrawAmount,
    #[msg("Insufficient Vault Funds")]
    InsufficientVaultFunds,
    #[msg("Cannot Withdraw Vault Account Rent")]
    CannotWithdrawVaultAccountRent,
    #[msg("Invalid Order Fee")]
    InvalidOrderFee,

    // Review errors
    #[msg("Invalid Review Rating")]
    InvalidReviewRating,
}
