import { encodeFunctionData, parseAbi, parseEther, parseGwei } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
export async function dev() {
  const account = privateKeyToAccount(generatePrivateKey())
  const to = "0x1234567890123456789012345678901234567880" // Replace with actual address

  const signature = await account.signTransaction({
    to,
    chainId: 1,
    data: encodeFunctionData({
      abi: parseAbi(["function waxingGibbous()"]),
      functionName: "waxingGibbous"
      // args: ["0x1234567890123456789012345678901234567890"]
    }),
    maxFeePerGas: parseGwei("20"),
    maxPriorityFeePerGas: parseGwei("1"),
    nonce: 0,
    type: "eip1559",
    value: parseEther("0.000000000000111")
  })
  console.log(signature)
}

await dev()
