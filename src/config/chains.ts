import { ethers } from "ethers";
import { sample } from "lodash";
import { NetworkMetadata } from "lib/wallets";
import { isDevelopment } from "./env";

const { parseEther } = ethers.utils;

export const MANTLE = 5000;
export const MANTLE_TESTNET = 5001;
export const FEES_HIGH_BPS = 50;

// TODO take it from web3
export const DEFAULT_CHAIN_ID = MANTLE;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

export const SUPPORTED_CHAIN_IDS = [MANTLE, MANTLE];

if (isDevelopment()) {
  SUPPORTED_CHAIN_IDS.push(MANTLE_TESTNET);
}

export const IS_NETWORK_DISABLED = {
  [MANTLE_TESTNET]: false,
  [MANTLE]: false,
};

export const CHAIN_NAMES_MAP = {
  [MANTLE]: "Mantle",
  [MANTLE_TESTNET]: "Mantle Testnet",
};

export const GAS_PRICE_ADJUSTMENT_MAP = {
  [MANTLE_TESTNET]: "0",
  [MANTLE]: "3000000000", // 3 gwei
};

export const MAX_GAS_PRICE_MAP = {
  [MANTLE]: "200000000000", // 200 gwei
};

export const HIGH_EXECUTION_FEES_MAP = {
  [MANTLE_TESTNET]: 3, // 3 USD
  [MANTLE]: 3, // 3 USD
};

const constants = {
  [MANTLE]: {
    nativeTokenSymbol: "MNT",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 8,
    v2: false,
  },

  [MANTLE_TESTNET]: {
    nativeTokenSymbol: "MNT",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 8,
    v2: false,
  },
};

const ALCHEMY_WHITELISTED_DOMAINS = ["gmx.io", "app.gmx.io"];

export const RPC_PROVIDERS = {
  [MANTLE]: ["https://rpc.mantle.xyz"],
  [MANTLE_TESTNET]: ["https://rpc.testnet.mantle.xyz"],
};

export const FALLBACK_PROVIDERS = {
  [MANTLE]: ["https://rpc.mantle.xyz"],
};

export const NETWORK_METADATA: { [chainId: number]: NetworkMetadata } = {
  [MANTLE]: {
    chainId: "0x" + MANTLE.toString(16),
    chainName: "MNT",
    nativeCurrency: {
      name: "MNT",
      symbol: "MNT",
      decimals: 18,
    },
    rpcUrls: RPC_PROVIDERS[MANTLE],
    blockExplorerUrls: ["https://explorer.mantle.xyz/"],
  },
  [MANTLE_TESTNET]: {
    chainId: "0x" + MANTLE_TESTNET.toString(16),
    chainName: "MNT Testnet",
    nativeCurrency: {
      name: "MNT",
      symbol: "MNT",
      decimals: 18,
    },
    rpcUrls: RPC_PROVIDERS[MANTLE_TESTNET],
    blockExplorerUrls: ["https://testnet.mantle.xyz/"],
  },
};

export const getConstant = (chainId: number, key: string) => {
  if (!constants[chainId]) {
    throw new Error(`Unsupported chainId ${chainId}`);
  }

  if (!(key in constants[chainId])) {
    throw new Error(`Key ${key} does not exist for chainId ${chainId}`);
  }

  return constants[chainId][key];
};

export function getChainName(chainId: number) {
  return CHAIN_NAMES_MAP[chainId];
}

export function getDefaultArbitrumRpcUrl() {
  return "https://rpc.mantle.xyz";
}

export function getRpcUrl(chainId: number): string | undefined {
  return sample(RPC_PROVIDERS[chainId]);
}

export function getFallbackRpcUrl(chainId: number): string | undefined {
  return sample(FALLBACK_PROVIDERS[chainId]);
}

export function getAlchemyHttpUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "https://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "https://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getAlchemyWsUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "wss://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "wss://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getExplorerUrl(chainId) {
  if (chainId === 5000) {
    return "https://explorer.mantle.xyz/";
  } else if (chainId === 5001) {
    return "https://explorer.testnet.mantle.xyz/";
  }
  return "https://explorer.testnet.mantle.xyz/";
}

export function getHighExecutionFee(chainId) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 5000;
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
