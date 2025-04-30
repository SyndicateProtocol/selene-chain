export interface LunarPhase {
  name: string
  symbol: string
  priority: string
}

export const lunarPhases: LunarPhase[] = [
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
