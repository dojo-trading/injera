// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export interface InstantiateMsg {
  owner: string
}
export type ExecuteMsg =
  | {
      create_position: NewPositionRequest
    }
  | {
      update_owner: OwnerUpdate
    }
  | {
      callback: CallbackMsg
    }
export type Uint128 = string
export type OwnerUpdate =
  | {
      propose_new_owner: {
        proposed: string
      }
    }
  | 'clear_proposed'
  | 'accept_proposed'
  | 'abolish_owner_role'
  | {
      set_emergency_owner: {
        emergency_owner: string
      }
    }
  | 'clear_emergency_owner'
export type CallbackMsg = {
  refund_coin: {
    denoms: string[]
    recipient: Addr
  }
}
export type Addr = string
export interface NewPositionRequest {
  lower_tick: number
  pool_id: number
  token_desired0?: Coin | null
  token_desired1?: Coin | null
  token_min_amount0: string
  token_min_amount1: string
  upper_tick: number
}
export interface Coin {
  amount: Uint128
  denom: string
  [k: string]: unknown
}
export type QueryMsg = {
  owner: {}
}
export interface OwnerResponse {
  abolished: boolean
  emergency_owner?: string | null
  initialized: boolean
  owner?: string | null
  proposed?: string | null
}
