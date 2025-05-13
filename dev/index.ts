import { SELENE_CHAIN } from "@/lib/constants"
import { createPublicClient, encodeFunctionData, http } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"

const seleneClient = createPublicClient({
  chain: SELENE_CHAIN,
  transport: http()
})

const MoonInteractionAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_angel721Address",
        type: "address",
        internalType: "address"
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "angel",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract Angel721"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "firstQuarter",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "lastQuarter",
    inputs: [
      {
        name: "messages",
        type: "string[]",
        internalType: "string[]"
      },
      {
        name: "recipients",
        type: "address[]",
        internalType: "address[]"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "newMoon",
    inputs: [
      {
        name: "message",
        type: "string",
        internalType: "string"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "waningCrescent",
    inputs: [],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "waningGibbous",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "waxingCrescent",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "waxingGibbous",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "FirstQuarter",
    inputs: [
      {
        name: "",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "LastQuarter",
    inputs: [
      {
        name: "",
        type: "string",
        indexed: false,
        internalType: "string"
      },
      {
        name: "",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "NewMoon",
    inputs: [
      {
        name: "",
        type: "string",
        indexed: false,
        internalType: "string"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "WaningCrescent",
    inputs: [
      {
        name: "",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "",
        type: "uint256",
        indexed: true,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "WaningGibbous",
    inputs: [
      {
        name: "",
        type: "string",
        indexed: false,
        internalType: "string"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "WaxingCrescent",
    inputs: [
      {
        name: "",
        type: "string",
        indexed: false,
        internalType: "string"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "WaxingGibbous",
    inputs: [
      {
        name: "",
        type: "string",
        indexed: false,
        internalType: "string"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      {
        name: "",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "",
        type: "uint256",
        indexed: true,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address"
      }
    ]
  }
] as const

export async function dev() {
  const account = privateKeyToAccount(generatePrivateKey())
  const to = "0x5B1859D85F3BDE34EdF4DDf3883d7e003bFe0A0D"

  const gas = await seleneClient.estimateGas({
    to,
    data: encodeFunctionData({
      abi: MoonInteractionAbi,
      functionName: "waningGibbous"
    })
  })

  console.log(gas)
}

await dev()
