import { encodeFunctionData, parseAbi, parseEther, parseGwei } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
export async function dev() {
  const account = privateKeyToAccount(generatePrivateKey())
  const to = "0x1234567890123456789012345678901234567880"

  const signature = await account.signTransaction({
    to,
    chainId: 1,
    data: encodeFunctionData({
      abi: parseAbi([
        "function whateverThingCouldGoHereWillGoHere(string,string,string)"
      ]),
      functionName: "whateverThingCouldGoHereWillGoHere",
      args: [
        "0x1234567890123456789012345678901234567890",
        "0x1234567890123456789012345678901234567890",
        "0x1234567890123456789012345678901234567890"
      ]
    }),
    maxFeePerGas: parseGwei("20"),
    maxPriorityFeePerGas: parseGwei("1"),
    nonce: 0,
    type: "eip1559",
    value: parseEther("0.1"),
    gas: BigInt(2_000_000)
  })
  console.log(signature)
}

await dev()
