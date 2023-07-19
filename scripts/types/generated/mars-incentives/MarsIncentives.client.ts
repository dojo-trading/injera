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
  Addr,
  OwnerUpdate,
  WhitelistEntry,
  QueryMsg,
  ArrayOfTupleOfStringAndUint128,
  ConfigResponse,
  ArrayOfEmissionResponse,
  EmissionResponse,
  Decimal,
  IncentiveStateResponse,
  ArrayOfIncentiveStateResponse,
  ArrayOfCoin,
  Coin,
  ArrayOfWhitelistEntry,
} from './MarsIncentives.types'
export interface MarsIncentivesReadOnlyInterface {
  contractAddress: string
  activeEmissions: ({
    collateralDenom,
  }: {
    collateralDenom: string
  }) => Promise<ArrayOfTupleOfStringAndUint128>
  config: () => Promise<ConfigResponse>
  incentiveState: ({
    collateralDenom,
    incentiveDenom,
  }: {
    collateralDenom: string
    incentiveDenom: string
  }) => Promise<IncentiveStateResponse>
  incentiveStates: ({
    limit,
    startAfterCollateralDenom,
    startAfterIncentiveDenom,
  }: {
    limit?: number
    startAfterCollateralDenom?: string
    startAfterIncentiveDenom?: string
  }) => Promise<ArrayOfIncentiveStateResponse>
  emission: ({
    collateralDenom,
    incentiveDenom,
    timestamp,
  }: {
    collateralDenom: string
    incentiveDenom: string
    timestamp: number
  }) => Promise<Uint128>
  emissions: ({
    collateralDenom,
    incentiveDenom,
    limit,
    startAfterTimestamp,
  }: {
    collateralDenom: string
    incentiveDenom: string
    limit?: number
    startAfterTimestamp?: number
  }) => Promise<ArrayOfEmissionResponse>
  userUnclaimedRewards: ({
    limit,
    startAfterCollateralDenom,
    startAfterIncentiveDenom,
    user,
  }: {
    limit?: number
    startAfterCollateralDenom?: string
    startAfterIncentiveDenom?: string
    user: string
  }) => Promise<ArrayOfCoin>
  whitelist: () => Promise<ArrayOfWhitelistEntry>
}
export class MarsIncentivesQueryClient implements MarsIncentivesReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.activeEmissions = this.activeEmissions.bind(this)
    this.config = this.config.bind(this)
    this.incentiveState = this.incentiveState.bind(this)
    this.incentiveStates = this.incentiveStates.bind(this)
    this.emission = this.emission.bind(this)
    this.emissions = this.emissions.bind(this)
    this.userUnclaimedRewards = this.userUnclaimedRewards.bind(this)
    this.whitelist = this.whitelist.bind(this)
  }

  activeEmissions = async ({
    collateralDenom,
  }: {
    collateralDenom: string
  }): Promise<ArrayOfTupleOfStringAndUint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      active_emissions: {
        collateral_denom: collateralDenom,
      },
    })
  }
  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  incentiveState = async ({
    collateralDenom,
    incentiveDenom,
  }: {
    collateralDenom: string
    incentiveDenom: string
  }): Promise<IncentiveStateResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      incentive_state: {
        collateral_denom: collateralDenom,
        incentive_denom: incentiveDenom,
      },
    })
  }
  incentiveStates = async ({
    limit,
    startAfterCollateralDenom,
    startAfterIncentiveDenom,
  }: {
    limit?: number
    startAfterCollateralDenom?: string
    startAfterIncentiveDenom?: string
  }): Promise<ArrayOfIncentiveStateResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      incentive_states: {
        limit,
        start_after_collateral_denom: startAfterCollateralDenom,
        start_after_incentive_denom: startAfterIncentiveDenom,
      },
    })
  }
  emission = async ({
    collateralDenom,
    incentiveDenom,
    timestamp,
  }: {
    collateralDenom: string
    incentiveDenom: string
    timestamp: number
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      emission: {
        collateral_denom: collateralDenom,
        incentive_denom: incentiveDenom,
        timestamp,
      },
    })
  }
  emissions = async ({
    collateralDenom,
    incentiveDenom,
    limit,
    startAfterTimestamp,
  }: {
    collateralDenom: string
    incentiveDenom: string
    limit?: number
    startAfterTimestamp?: number
  }): Promise<ArrayOfEmissionResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      emissions: {
        collateral_denom: collateralDenom,
        incentive_denom: incentiveDenom,
        limit,
        start_after_timestamp: startAfterTimestamp,
      },
    })
  }
  userUnclaimedRewards = async ({
    limit,
    startAfterCollateralDenom,
    startAfterIncentiveDenom,
    user,
  }: {
    limit?: number
    startAfterCollateralDenom?: string
    startAfterIncentiveDenom?: string
    user: string
  }): Promise<ArrayOfCoin> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_unclaimed_rewards: {
        limit,
        start_after_collateral_denom: startAfterCollateralDenom,
        start_after_incentive_denom: startAfterIncentiveDenom,
        user,
      },
    })
  }
  whitelist = async (): Promise<ArrayOfWhitelistEntry> => {
    return this.client.queryContractSmart(this.contractAddress, {
      whitelist: {},
    })
  }
}
export interface MarsIncentivesInterface extends MarsIncentivesReadOnlyInterface {
  contractAddress: string
  sender: string
  updateWhitelist: (
    {
      addDenoms,
      removeDenoms,
    }: {
      addDenoms: WhitelistEntry[]
      removeDenoms: string[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  setAssetIncentive: (
    {
      collateralDenom,
      duration,
      emissionPerSecond,
      incentiveDenom,
      startTime,
    }: {
      collateralDenom: string
      duration: number
      emissionPerSecond: Uint128
      incentiveDenom: string
      startTime: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  balanceChange: (
    {
      denom,
      totalAmountScaledBefore,
      userAddr,
      userAmountScaledBefore,
    }: {
      denom: string
      totalAmountScaledBefore: Uint128
      userAddr: Addr
      userAmountScaledBefore: Uint128
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  claimRewards: (
    {
      limit,
      startAfterCollateralDenom,
      startAfterIncentiveDenom,
    }: {
      limit?: number
      startAfterCollateralDenom?: string
      startAfterIncentiveDenom?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      addressProvider,
      maxWhitelistedDenoms,
    }: {
      addressProvider?: string
      maxWhitelistedDenoms?: number
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
}
export class MarsIncentivesClient
  extends MarsIncentivesQueryClient
  implements MarsIncentivesInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.updateWhitelist = this.updateWhitelist.bind(this)
    this.setAssetIncentive = this.setAssetIncentive.bind(this)
    this.balanceChange = this.balanceChange.bind(this)
    this.claimRewards = this.claimRewards.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.updateOwner = this.updateOwner.bind(this)
  }

  updateWhitelist = async (
    {
      addDenoms,
      removeDenoms,
    }: {
      addDenoms: WhitelistEntry[]
      removeDenoms: string[]
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_whitelist: {
          add_denoms: addDenoms,
          remove_denoms: removeDenoms,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  setAssetIncentive = async (
    {
      collateralDenom,
      duration,
      emissionPerSecond,
      incentiveDenom,
      startTime,
    }: {
      collateralDenom: string
      duration: number
      emissionPerSecond: Uint128
      incentiveDenom: string
      startTime: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        set_asset_incentive: {
          collateral_denom: collateralDenom,
          duration,
          emission_per_second: emissionPerSecond,
          incentive_denom: incentiveDenom,
          start_time: startTime,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  balanceChange = async (
    {
      denom,
      totalAmountScaledBefore,
      userAddr,
      userAmountScaledBefore,
    }: {
      denom: string
      totalAmountScaledBefore: Uint128
      userAddr: Addr
      userAmountScaledBefore: Uint128
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        balance_change: {
          denom,
          total_amount_scaled_before: totalAmountScaledBefore,
          user_addr: userAddr,
          user_amount_scaled_before: userAmountScaledBefore,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  claimRewards = async (
    {
      limit,
      startAfterCollateralDenom,
      startAfterIncentiveDenom,
    }: {
      limit?: number
      startAfterCollateralDenom?: string
      startAfterIncentiveDenom?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        claim_rewards: {
          limit,
          start_after_collateral_denom: startAfterCollateralDenom,
          start_after_incentive_denom: startAfterIncentiveDenom,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  updateConfig = async (
    {
      addressProvider,
      maxWhitelistedDenoms,
    }: {
      addressProvider?: string
      maxWhitelistedDenoms?: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          address_provider: addressProvider,
          max_whitelisted_denoms: maxWhitelistedDenoms,
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
}
