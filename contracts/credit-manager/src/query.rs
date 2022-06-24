use std::convert::TryFrom;

use cosmwasm_std::{Addr, Deps, Order, StdResult};
use cw_asset::{AssetInfo, AssetInfoKey, AssetInfoUnchecked, AssetUnchecked};
use cw_storage_plus::Bound;
use rover::msg::query::{ConfigResponse, PositionResponse};

use crate::state::{ACCOUNT_NFT, ALLOWED_ASSETS, ALLOWED_VAULTS, ASSETS, OWNER};

const MAX_LIMIT: u32 = 30;
const DEFAULT_LIMIT: u32 = 10;

pub fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    Ok(ConfigResponse {
        owner: OWNER.load(deps.storage)?.into(),
        account_nft: ACCOUNT_NFT
            .may_load(deps.storage)?
            .map(|addr| addr.to_string()),
    })
}

pub fn query_position(deps: Deps, token_id: String) -> StdResult<PositionResponse> {
    let res: StdResult<Vec<AssetUnchecked>> = ASSETS
        .prefix(token_id.clone())
        .range(deps.storage, None, None, Order::Ascending)
        .into_iter()
        .map(|res| {
            let (asset_info_key, amount) = res?;
            let info_unchecked = AssetInfoUnchecked::try_from(asset_info_key.clone())?;
            Ok(AssetUnchecked::new(info_unchecked, amount.u128()))
        })
        .collect();

    Ok(PositionResponse {
        token_id,
        assets: res?,
    })
}

/// NOTE: This implementation of the query function assumes the map `ALLOWED_VAULTS` only saves `true`.
/// If a vault is to be removed from the whitelist, the map must remove the correspoinding key, instead
/// of setting the value to `false`.
pub fn query_allowed_vaults(
    deps: Deps,
    start_after: Option<String>,
    limit: Option<u32>,
) -> StdResult<Vec<String>> {
    let addr: Addr;
    let start = match &start_after {
        Some(addr_str) => {
            addr = deps.api.addr_validate(addr_str)?;
            Some(Bound::exclusive(addr))
        }
        None => None,
    };

    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;

    ALLOWED_VAULTS
        .keys(deps.storage, start, None, Order::Ascending)
        .take(limit)
        .map(|res| res.map(|vault_addr| vault_addr.to_string()))
        .collect()
}

/// NOTE: This implementation of the query function assumes the map `ALLOWED_ASSETS` only saves `true`.
/// If an asset is to be removed from the whitelist, the map must remove the corresponding key, instead
/// of setting the value to `false`.
pub fn query_allowed_assets(
    deps: Deps,
    start_after: Option<AssetInfoUnchecked>,
    limit: Option<u32>,
) -> StdResult<Vec<AssetInfoUnchecked>> {
    let info: AssetInfo;
    let start = match &start_after {
        Some(unchecked) => {
            info = unchecked.check(deps.api, None)?;
            Some(Bound::exclusive(AssetInfoKey::from(info)))
        }
        None => None,
    };

    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;

    ALLOWED_ASSETS
        .keys(deps.storage, start, None, Order::Ascending)
        .take(limit)
        .collect::<StdResult<Vec<_>>>()?
        .into_iter()
        .map(AssetInfoUnchecked::try_from)
        .collect()
}
