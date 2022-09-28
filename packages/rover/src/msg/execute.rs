use cosmwasm_schema::cw_serde;
use cosmwasm_std::{to_binary, Addr, Coin, CosmosMsg, Decimal, StdResult, Uint128, WasmMsg};

use crate::adapters::{Vault, VaultUnchecked};
use crate::msg::instantiate::ConfigUpdates;

#[cw_serde]
pub enum ExecuteMsg {
    //--------------------------------------------------------------------------------------------------
    // Public messages
    //--------------------------------------------------------------------------------------------------
    /// Mints NFT representing a credit account for user. User can have many.
    CreateCreditAccount {},
    /// Update user's position on their credit account
    UpdateCreditAccount {
        account_id: String,
        actions: Vec<Action>,
    },

    //--------------------------------------------------------------------------------------------------
    // Privileged messages
    //--------------------------------------------------------------------------------------------------
    /// Update contract config constants
    UpdateConfig { new_config: ConfigUpdates },
    /// Internal actions only callable by the contract itself
    Callback(CallbackMsg),
}

/// The list of actions that users can perform on their positions
#[cw_serde]
pub enum Action {
    /// Deposit coin of specified denom and amount. Verifies if the correct amount is sent with transaction.
    Deposit(Coin),
    /// Withdraw coin of specified denom and amount
    Withdraw(Coin),
    /// Borrow coin of specified amount from Red Bank
    Borrow(Coin),
    /// Repay coin of specified amount back to Red Bank
    Repay(Coin),
    /// Deposit coins into vault strategy
    VaultDeposit {
        vault: VaultUnchecked,
        coins: Vec<Coin>,
    },
    /// Withdraw underlying coins from vault
    VaultWithdraw {
        vault: VaultUnchecked,
        amount: Uint128,
    },
    /// Pay back debt of a liquidatable rover account for a bonus. Requires specifying 1) the debt
    /// denom/amount of what the liquidator wants to payoff and 2) the request coin denom which the
    /// liquidatee should have a balance of. The amount returned to liquidator will be the request coin
    /// of the amount that precisely matches the value of the debt + a liquidation bonus.
    /// The debt amount will be adjusted down if:
    /// - Exceeds liquidatee's total debt for denom
    /// - Not enough liquidatee request coin balance to match
    /// - The value of the debt repaid exceeds the maximum close factor %
    LiquidateCoin {
        /// The credit account id of the one with a liquidation threshold health factor 1 or below
        liquidatee_account_id: String,
        /// The coin debt that the liquidator wishes to pay back on behalf of the liquidatee.
        /// The liquidator must already have these assets in their credit account.
        debt_coin: Coin,
        /// The coin they wish to acquire from the liquidatee (amount returned will include the bonus)
        request_coin_denom: String,
    },
    /// Perform a swapper with an exact-in amount. Requires slippage allowance %.
    SwapExactIn {
        coin_in: Coin,
        denom_out: String,
        slippage: Decimal,
    },
}

/// Internal actions made by the contract with pre-validated inputs
#[cw_serde]
pub enum CallbackMsg {
    /// Withdraw specified amount of coin from credit account;
    /// Decrement the token's asset amount;
    Withdraw {
        account_id: String,
        coin: Coin,
        recipient: Addr,
    },
    /// Borrow specified amount of coin from Red Bank;
    /// Increase the token's coin amount and debt shares;
    Borrow { account_id: String, coin: Coin },
    /// Repay coin of specified amount back to Red Bank;
    /// Decrement the token's coin amount and debt shares;
    Repay { account_id: String, coin: Coin },
    /// Calculate the account's max loan-to-value health factor. If above 1,
    /// emits a `position_changed` event. If 1 or below, raises an error.
    AssertBelowMaxLTV { account_id: String },
    /// Adds list of coins to a vault strategy
    VaultDeposit {
        account_id: String,
        vault: Vault,
        coins: Vec<Coin>,
    },
    /// Used to update the account balance of vault coins after a vault action has taken place
    UpdateVaultCoinBalance {
        vault: Vault,
        /// Account that needs vault coin balance adjustment
        account_id: String,
        /// Total vault coin balance in Rover
        previous_total_balance: Uint128,
    },
    /// Exchanges vault LP shares for assets
    VaultWithdraw {
        account_id: String,
        vault: Vault,
        amount: Uint128,
    },
    /// A privileged action only to be used by Rover. Same as `VaultWithdraw` except it bypasses any lockup period
    /// restrictions on the vault. Used only in the case position is unhealthy and requires immediate liquidation.
    VaultForceWithdraw {
        account_id: String,
        vault: Vault,
        amount: Uint128,
    },
    /// Pay back debts of a liquidatable rover account for a bonus
    LiquidateCoin {
        liquidator_account_id: String,
        liquidatee_account_id: String,
        debt_coin: Coin,
        request_coin_denom: String,
    },
    /// Determine health factor improved as a consequence of liquidation event
    AssertHealthFactorImproved {
        account_id: String,
        previous_health_factor: Decimal,
    },
    /// Perform a swapper with an exact-in amount. Requires slippage allowance %.
    SwapExactIn {
        account_id: String,
        coin_in: Coin,
        denom_out: String,
        slippage: Decimal,
    },
    /// Used to update the coin balance of account after an async action
    UpdateCoinBalances {
        /// Account that needs coin balance adjustment
        account_id: String,
        /// Total balances for coins in Rover prior to withdraw
        previous_balances: Vec<Coin>,
    },
}

impl CallbackMsg {
    pub fn into_cosmos_msg(&self, contract_addr: &Addr) -> StdResult<CosmosMsg> {
        Ok(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: contract_addr.to_string(),
            msg: to_binary(&ExecuteMsg::Callback(self.clone()))?,
            funds: vec![],
        }))
    }
}
