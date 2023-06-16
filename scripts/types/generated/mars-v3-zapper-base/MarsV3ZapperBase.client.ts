// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { StdFee } from '@cosmjs/amino'
import {
  InstantiateMsg,
  ExecuteMsg,
  Uint128,
  OwnerUpdate,
  CallbackMsg,
  Addr,
  NewPositionRequest,
  Coin,
  QueryMsg,
  OwnerResponse,
} from './MarsV3ZapperBase.types'
export interface MarsV3ZapperBaseReadOnlyInterface {
  contractAddress: string
  owner: () => Promise<OwnerResponse>
}
export class MarsV3ZapperBaseQueryClient implements MarsV3ZapperBaseReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.owner = this.owner.bind(this)
  }

  owner = async (): Promise<OwnerResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      owner: {},
    })
  }
}
export interface MarsV3ZapperBaseInterface extends MarsV3ZapperBaseReadOnlyInterface {
  contractAddress: string
  sender: string
  createPosition: (
    {
      lowerTick,
      poolId,
      tokenDesired0,
      tokenDesired1,
      tokenMinAmount0,
      tokenMinAmount1,
      upperTick,
    }: {
      lowerTick: number
      poolId: number
      tokenDesired0?: Coin
      tokenDesired1?: Coin
      tokenMinAmount0: string
      tokenMinAmount1: string
      upperTick: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateOwner: (
    ownerUpdate: OwnerUpdate,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  callback: (
    callbackMsg: CallbackMsg,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
}
export class MarsV3ZapperBaseClient
  extends MarsV3ZapperBaseQueryClient
  implements MarsV3ZapperBaseInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.createPosition = this.createPosition.bind(this)
    this.updateOwner = this.updateOwner.bind(this)
    this.callback = this.callback.bind(this)
  }

  createPosition = async (
    {
      lowerTick,
      poolId,
      tokenDesired0,
      tokenDesired1,
      tokenMinAmount0,
      tokenMinAmount1,
      upperTick,
    }: {
      lowerTick: number
      poolId: number
      tokenDesired0?: Coin
      tokenDesired1?: Coin
      tokenMinAmount0: string
      tokenMinAmount1: string
      upperTick: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create_position: {
          lower_tick: lowerTick,
          pool_id: poolId,
          token_desired0: tokenDesired0,
          token_desired1: tokenDesired1,
          token_min_amount0: tokenMinAmount0,
          token_min_amount1: tokenMinAmount1,
          upper_tick: upperTick,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  updateOwner = async (
    ownerUpdate: OwnerUpdate,
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_owner: ownerUpdate,
      },
      fee,
      memo,
      _funds,
    )
  }
  callback = async (
    callbackMsg: CallbackMsg,
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        callback: callbackMsg,
      },
      fee,
      memo,
      _funds,
    )
  }
}
