use cosmwasm_std::Addr;
use cw721::OwnerOfResponse;
use cw721_base::InstantiateMsg as NftInstantiateMsg;
use cw721_base::QueryMsg as NftQueryMsg;
use cw_multi_test::Executor;
use rover::msg::query::ConfigResponse;
use rover::msg::ExecuteMsg::UpdateConfig;
use rover::msg::{InstantiateMsg, QueryMsg};

use crate::helpers::{
    get_token_id, mock_account_nft_contract, mock_app, mock_contract, mock_create_credit_account,
    transfer_nft_contract_ownership,
};

pub mod helpers;

#[test]
fn test_create_credit_account() {
    let mut app = mock_app();
    let owner = Addr::unchecked("owner");

    let nft_contract_code_id = app.store_code(mock_account_nft_contract());

    let nft_contract_addr = app
        .instantiate_contract(
            nft_contract_code_id,
            owner.clone(),
            &NftInstantiateMsg {
                name: String::from("Rover Credit Account"),
                symbol: String::from("RCA"),
                minter: owner.to_string(),
            },
            &[],
            "manager-mock-account-nft",
            None,
        )
        .unwrap();

    let credit_manager_code_id = app.store_code(mock_contract());
    let manager_initiate_msg = InstantiateMsg {
        owner: owner.to_string(),
        allowed_vaults: vec![],
        allowed_assets: vec![],
    };

    let manager_contract_addr = app
        .instantiate_contract(
            credit_manager_code_id,
            owner.clone(),
            &manager_initiate_msg,
            &[],
            "manager-mock-account-nft",
            None,
        )
        .unwrap();

    let user = Addr::unchecked("some_user");
    let res = mock_create_credit_account(&mut app, &manager_contract_addr, &user);

    if res.is_ok() {
        panic!("Should have thrown error due to nft contract not yet set");
    }

    let res = app.execute_contract(
        owner.clone(),
        manager_contract_addr.clone(),
        &UpdateConfig {
            account_nft: Some(nft_contract_addr.to_string()),
            owner: None,
        },
        &[],
    );

    if res.is_ok() {
        panic!("Should have thrown error due to nft contract not proposing a new owner yet");
    }

    transfer_nft_contract_ownership(&mut app, &owner, &nft_contract_addr, &manager_contract_addr);

    let res = mock_create_credit_account(&mut app, &manager_contract_addr, &user).unwrap();

    let token_id = get_token_id(res);
    assert_eq!(token_id, "1");

    // Double checking ownership by querying NFT account-nft for correct owner
    let config_res: ConfigResponse = app
        .wrap()
        .query_wasm_smart(manager_contract_addr.clone(), &QueryMsg::Config {})
        .unwrap();

    let owner_res: OwnerOfResponse = app
        .wrap()
        .query_wasm_smart(
            config_res.account_nft.unwrap(),
            &NftQueryMsg::OwnerOf {
                token_id: token_id.to_string(),
                include_expired: None,
            },
        )
        .unwrap();

    assert_eq!(user, owner_res.owner)
}
