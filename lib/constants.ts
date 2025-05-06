import type { MoonPhase } from "@/components/MoonPhaseProvider"

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
    priority: "Prioritizes contract deployments"
  },
  {
    name: "First Quarter",
    symbol: "G",
    priority: "FIFO"
  },
  {
    name: "Waxing Gibbous",
    symbol: "J",
    priority: "Prioritizes batch transactions"
  },
  {
    name: "Full",
    symbol: "N",
    priority: "Prioritizes transactions interacting with token contracts"
  },
  {
    name: "Waning Gibbous",
    symbol: "R",
    priority: "Prioritizes higher gas limits"
  },
  {
    name: "Last Quarter",
    symbol: "U",
    priority: "Prioritizes gas-efficient transactions"
  },
  {
    name: "Waning Crescent",
    symbol: "X",
    priority: "Prioritizes gas-efficient transactions"
  }
]

export const SYNDICATE_EXO = {
  id: 5_113,
  name: "Syndicate Exo",
  network: "syndicate-exo",
  nativeCurrency: { name: "SYND", symbol: "SYND", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://syndicate-exo.g.alchemy.com/v2/WNREj56kfQb9Rbz9BVEcTBBrHA7zMPqb"
      ]
    },
    public: {
      http: [
        "https://syndicate-exo.g.alchemy.com/v2/WNREj56kfQb9Rbz9BVEcTBBrHA7zMPqb"
      ]
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
  "0xA0E8Ee80b1Ae18Cd2aFC844502B72abC7f0EEA8D"

export const MOONPHASE_INTERACTION_CONTRACT =
  "0x268e0A6c79107f74Cf5Ef3067C110952e9127843"

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
