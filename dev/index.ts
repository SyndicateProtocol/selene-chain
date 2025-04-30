import { encodeFunctionData, parseAbi, parseGwei } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
export async function dev() {
  const account = privateKeyToAccount(generatePrivateKey())
  const to = "0x1234567890123456789012345678901234567880" // Replace with actual address

  const signature = await account.signTransaction({
    to,
    chainId: 1,
    data: encodeFunctionData({
      abi: parseAbi(["function somethingElse(address,bool)"]),
      functionName: "somethingElse",
      args: ["0x1234567890123456789012345678901234567890", true]
    }),
    maxFeePerGas: parseGwei("20"),
    maxPriorityFeePerGas: parseGwei("1"),
    nonce: 0,
    type: "eip1559"
  })
  console.log(signature)
}

await dev()
