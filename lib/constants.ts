import type { MoonPhase } from "@/components/Providers"

export interface LunarPhaseInterface {
  name: string
  symbol: string
  priority: string
}

export const lunarPhases: LunarPhaseInterface[] = [
  {
    name: "New",
    symbol: "A",
    priority: "Prioritizes low calldata size"
  },
  {
    name: "Waxing Crescent",
    symbol: "D",
    priority: "Can only broadcast to allowed contract"
  },
  {
    name: "First Quarter",
    symbol: "G",
    priority: "Must send angel number donation in all transactions"
  },
  {
    name: "Waxing Gibbous",
    symbol: "J",
    priority:
      "Can only send transactions with waxingGibbous() function signature"
  },
  {
    name: "Full",
    symbol: "N",
    priority: "Can only interact with token contracts"
  },
  {
    name: "Waning Gibbous",
    symbol: "R",
    priority: "Gas limit must be >2M gas"
  },
  {
    name: "Last Quarter",
    symbol: "U",
    priority: "Gas limit to calldata ratio must be >= 16"
  },
  {
    name: "Waning Crescent",
    symbol: "X",
    priority: "Can only send transactions with value <= 0.01 ETH"
  }
]

const EXO_RPC_URL =
  process.env.EXO_RPC || "https://syndicate-exo.g.alchemy.com/v2"
export const SYNDICATE_EXO = {
  id: 5_113,
  name: "Syndicate Exo",
  network: "syndicate-exo",
  nativeCurrency: { name: "SYND", symbol: "SYND", decimals: 18 },
  rpcUrls: {
    default: {
      http: [EXO_RPC_URL] as readonly string[]
    },
    public: {
      http: [EXO_RPC_URL] as readonly string[]
    }
  },
  blockExplorers: {
    default: {
      name: "Syndicate Exo Explorer",
      url: "https://syndicate-exo.explorer.alchemy.com/"
    }
  },
  testnet: true
}

export const SELENE_CHAIN = {
  id: 63_888,
  name: "Selene",
  network: "selene",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://selene.rpc.testnet.syndicate.io"]
    },
    public: {
      http: ["https://selene.rpc.testnet.syndicate.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Selene Explorer",
      url: "https://selene.explorer.testnet.syndicate.io"
    }
  }
}

export const MOONPHASE_PERMISSION_MODULE =
  "0x255a995685FAf63FE69c60Edd3e414DA3CB8fe7d"

export const MOONPHASE_INTERACTION_CONTRACT =
  "0xf2921AF55D7d01d1441c58F3EfA9EcE1f405FBC2"

export const MOONPHASE_MINT_CONTRACT =
  "0x49436F4956E80D9e27826ec6e43f06b9a4E54C69"

export const BLOCK_EXPLORER_URL =
  "https://selene.explorer.testnet.syndicate.io/"

export const DASHBOARD_PROJECT_ID = "74093453-7cc7-45a2-8bfc-2c186531858c"

export const lunarPreferences: Record<MoonPhase, string> = {
  "New Moon": "lowCalldata",
  "Waxing Crescent": "contractCall",
  "First Quarter": "angelNumber",
  "Waxing Gibbous": "waxingGibbous",
  "Full Moon": "tokenTransfer",
  "Waning Gibbous": "highGas",
  "Last Quarter": "balancedGas",
  "Waning Crescent": "lowValue"
}
