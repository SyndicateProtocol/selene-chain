"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/Accordion"
import { lunarPhases } from "@/lib/constants"
import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"

export default function HowTo() {
  const [highlightedCodes, setHighlightedCodes] = useState<{
    [key: string]: string
  }>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  )
  const [feedback, setFeedback] = useState<string | null>(null)

  const lunarPhase = lunarPhases.find(
    (phase) => phase.name === "Waning Gibbous"
  )

  // Map lunar phases to preferred transaction types
  // update when we have it codified
  const lunarPreferences: Record<string, string> = {
    "Waning Gibbous": "highGas",
    "Full": "lowCalldata",
    "Waxing Crescent": "nftMint"
  }

  // TODO - update
  const codeSnippets = {
    highGas: `
const tx = await contract.executeHighGasPriorityTransaction({
  value: viem.parseEther("0.1"),  
  gasLimit: 500000,  // High gas limit to prioritize this transaction
});
    `,
    nftMint: `
const mintTx = await nftContract.mint({
  to: "0xYourAddress",
  tokenId: 123,
  royaltyBps: 250,  // 2.5% royalty
  gasLimit: 350000,
});
    `,
    lowCalldata: `
// Compress calldata to minimize transaction size
const compressedData = encodePacked(
  ["uint8", "uint16", "address"],
  [1, 1000, "0xRecipientAddress"]
);

const tx = await contract.executeMinimalTransaction(compressedData, {
  gasLimit: 200000,
});
    `
  }

  const transactionDescriptions = {
    highGas:
      "Gas-heavy transactions that prioritize speed and inclusion in the next block, regardless of cost.",
    nftMint:
      "Balanced transactions with moderate gas usage, perfect for creative operations like minting.",
    lowCalldata:
      "Efficient transactions that minimize on-chain data, optimizing for lower costs."
  }

  useEffect(() => {
    const highlightAllCode = async () => {
      try {
        const promises = Object.entries(codeSnippets).map(
          async ([key, snippet]) => {
            const html = await codeToHtml(snippet, {
              lang: "typescript",
              theme: "tokyo-night"
            })
            return [key, html]
          }
        )

        const results = await Promise.all(promises)
        const highlightedObject = Object.fromEntries(results)
        setHighlightedCodes(highlightedObject)
      } catch (error) {
        console.error("Error highlighting code:", error)
        // Fallback to the original code without highlighting
        const fallbackObject = Object.fromEntries(
          Object.entries(codeSnippets).map(([key, snippet]) => [
            key,
            `<pre><code>${snippet}</code></pre>`
          ])
        )
        setHighlightedCodes(fallbackObject)
      } finally {
        setIsLoading(false)
      }
    }

    highlightAllCode()
  }, [])

  const renderCodeBlock = (key: keyof typeof codeSnippets) => {
    if (isLoading) {
      return <code className="block my-2 text-[10px]">{codeSnippets[key]}</code>
    }

    return (
      <div
        className="block my-2 text-[10px]"
        dangerouslySetInnerHTML={{ __html: highlightedCodes[key] }}
      />
    )
  }

  const handleRunTransaction = (transactionType: string) => {
    setSelectedTransaction(transactionType)

    const preferredType =
      lunarPreferences[lunarPhase?.name || ""] || "lowCalldata"

    if (transactionType === preferredType) {
      setFeedback(
        `✨ Great choice! The ${lunarPhase?.name} favors this type of transaction. Your transaction is being processed with priority.`
      )
    } else {
      setFeedback(
        `⚠️ This transaction might not be optimal during the ${lunarPhase?.name}. The sequencer might delay processing it.`
      )
    }

    // Could add simulated transaction processing logic here
  }

  return (
    <div className="p-1 bg-white/40 backdrop-blur-sm rounded-xl self-baseline max-w-full">
      <div className="p-4">
        <div className="font-medium text-2xl mb-4">
          Lunar Transaction Challenge
        </div>
        <div className="max-w-prose mb-4">
          <p className="text-sm">
            The blockchain sequencer's mood is influenced by the current lunar
            phase:{" "}
            <span className="text-black font-semibold inline-flex items-center">
              {lunarPhase?.name}
              <span className="font-moonphases pl-1 text-lg">
                {lunarPhase?.symbol}
              </span>
            </span>
          </p>
          <p className="text-sm mt-3">
            <strong>Your challenge:</strong> Choose the transaction type that
            will be most favored during this lunar phase. Each phase prefers
            different transaction characteristics!
          </p>
        </div>

        {feedback && (
          <div
            className={`p-3 mb-4 rounded-lg ${feedback.includes("Great") ? "bg-green-100" : "bg-yellow-100"}`}
          >
            <p className="text-sm">{feedback}</p>
          </div>
        )}

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="high-gas">
            <AccordionTrigger className="font-medium">
              High gas transaction
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm mb-3">{transactionDescriptions.highGas}</p>
              {renderCodeBlock("highGas")}
              <button
                type="button"
                onClick={() => handleRunTransaction("highGas")}
                className={`${selectedTransaction === "highGas" ? "bg-gray-600" : "bg-black"} px-3 py-1.5 rounded-md text-sm text-white self-center mt-2 hover:bg-gray-800 transition-colors`}
              >
                {selectedTransaction === "highGas"
                  ? "Processing..."
                  : "Execute transaction →"}
              </button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="nft-mint">
            <AccordionTrigger className="font-medium">
              NFT mint
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm mb-3">{transactionDescriptions.nftMint}</p>
              {renderCodeBlock("nftMint")}
              <button
                type="button"
                onClick={() => handleRunTransaction("nftMint")}
                className={`${selectedTransaction === "nftMint" ? "bg-gray-600" : "bg-black"} px-3 py-1.5 rounded-md text-sm text-white self-center mt-2 hover:bg-gray-800 transition-colors`}
              >
                {selectedTransaction === "nftMint"
                  ? "Processing..."
                  : "Execute transaction →"}
              </button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="low-calldata">
            <AccordionTrigger className="font-medium">
              Low calldata size
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm mb-3">
                {transactionDescriptions.lowCalldata}
              </p>
              {renderCodeBlock("lowCalldata")}
              <button
                type="button"
                onClick={() => handleRunTransaction("lowCalldata")}
                className={`${selectedTransaction === "lowCalldata" ? "bg-gray-600" : "bg-black"} px-3 py-1.5 rounded-md text-sm text-white self-center mt-2 hover:bg-gray-800 transition-colors`}
              >
                {selectedTransaction === "lowCalldata"
                  ? "Processing..."
                  : "Execute transaction →"}
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
