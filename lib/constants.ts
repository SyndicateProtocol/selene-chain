export interface LunarPhase {
  name: string
  symbol: string
  priority: string
}

export const lunarPhases: LunarPhase[] = [
  {
    name: "New Moon",
    symbol: "A",
    priority: "Prioritizes low calldata size"
  },
  {
    name: "Waxing Crescent Moon",
    symbol: "D",
    priority: "Prioritizes contract deployments"
  },
  {
    name: "First Quarter Moon",
    symbol: "G",
    priority: "FIFO"
  },
  {
    name: "Waxing Gibbous Moon",
    symbol: "J",
    priority: "Prioritizes batch transactions"
  },
  {
    name: "Full Moon",
    symbol: "N",
    priority: "Prioritizes transactions interacting with token contracts"
  },
  {
    name: "Waning Gibbous Moon",
    symbol: "R",
    priority: "Prioritizes higher gas limits"
  },
  {
    name: "Last Quarter Moon",
    symbol: "U",
    priority: "Prioritizes gas-efficient transactions"
  },
  {
    name: "Waning Crescent Moon",
    symbol: "X",
    priority: "Prioritizes gas-efficient transactions"
  }
]
