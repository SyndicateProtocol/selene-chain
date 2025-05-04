"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/Accordion"
import useLunarPhase from "@/lib/hooks"
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

  const currentPhase = useLunarPhase();


  // TODO: update this once we finalize contract
  const lunarPreferences: Record<string, string> = {
    "New Moon": "lowCalldata",
    "Waxing Crescent": "contractCall",
    "First Quarter": "angelNumber",
    "Waxing Gibbous": "waxingGibbous",
    "Full Moon": "tokenTransfer",
    "Waning Gibbous": "highGas",
    "Last Quarter": "balancedGas",
    "Waning Crescent": "lowValue"
  }

  // TODO: update this once we finalize contract
  const codeSnippets = {
    lowCalldata: `
// Compress calldata to minimize transaction size
const tx = await contract.transferMinimal("0xRecipient", {
  data: "0x1234",  // Very small calldata
  gasLimit: 100000
});
    `,
    contractCall: `
// Call the allowed contract directly
const tx = await moonInteraction.waxingCrescent({
  gasLimit: 200000
});
    `,
    angelNumber: `
// Send with an angel number value
const tx = await contract.donate({
  value: ethers.utils.parseEther("0.333"),  // Angel number
  gasLimit: 150000
});
    `,
    waxingGibbous: `
// Call the specific waxingGibbous function
const tx = await moonInteraction.waxingGibbous({
  gasLimit: 200000
});
    `,
    tokenTransfer: `
// Transfer ERC20 or ERC721 tokens
const tx = await token.transfer(
  "0xRecipient",
  ethers.utils.parseEther("10"),
  { gasLimit: 150000 }
);
    `,
    highGas: `
// High gas limit transaction
const tx = await contract.execute({
  gasLimit: 2500000  // High gas limit ≥ 2,000,000
});
    `,
    balancedGas: `
// Balanced gas/data transaction
const tx = await contract.executeEfficient(data, {
  gasLimit: 1200000,  // ≥ 1,000,000 with moderate calldata
  data: "0x1234...5678" // ≤ 1,000 bytes
});
    `,
    lowValue: `
// Low value transaction
const tx = await contract.send("0xRecipient", {
  value: ethers.utils.parseEther("0.05"),  // ≤ 0.1 ETH
  gasLimit: 100000
});
    `
  }

  const transactionDescriptions = {
    lowCalldata: "Efficient transactions with minimal calldata (≤ 100 bytes), optimizing for lower costs.",
    contractCall: "Transactions targeting only the allowed MoonInteraction contract.",
    angelNumber: "Transactions with angel numbers as ETH values (e.g., 0.333 ETH, 0.555 ETH).",
    waxingGibbous: "Transactions that specifically call the waxingGibbous() function.",
    tokenTransfer: "Transactions interacting with ERC20, ERC721, or ERC1155 token contracts.",
    highGas: "Gas-heavy transactions with gas limit ≥ 2,000,000 units.",
    balancedGas: "Balanced transactions with gas limit ≥ 1,000,000 and calldata ≤ 1,000 bytes.",
    lowValue: "Low value transactions (≤ 0.1 ETH)."
  }

  // Decide which 3 transaction types to display based on current phase
  const getTransactionOptions = () => {
    const correctType = lunarPreferences[currentPhase]

    // Pick 2 others that aren't the correct one :-p
    const otherTypes = Object.keys(codeSnippets)
      .filter(type => type !== correctType)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)

    return [correctType, ...otherTypes]
  }

  const transactionOptions = getTransactionOptions()

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

    const preferredType = lunarPreferences[currentPhase] || "highGas"

    if (transactionType === preferredType) {
      setFeedback(
        `✨ Great choice! The ${currentPhase} favors this type of transaction. Your transaction is being processed with priority.`
      )
    } else {
      setFeedback(
        `⚠️ This transaction might not be optimal during the ${currentPhase}. The sequencer might delay processing it.`
      )
    }

    // TODO: integrate transaction cloud
  }

  // TODO: update this once we finalize contract
  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "lowCalldata": return "Low calldata transaction";
      case "contractCall": return "Contract call";
      case "angelNumber": return "Angel number donation";
      case "waxingGibbous": return "Waxing Gibbous function call";
      case "tokenTransfer": return "Token transfer";
      case "highGas": return "High gas transaction";
      case "balancedGas": return "Balanced gas transaction";
      case "lowValue": return "Low value transaction";
      default: return type;
    }
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
              {currentPhase}
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
          {transactionOptions.map((type) => (
            <AccordionItem key={type} value={type}>
              <AccordionTrigger className="font-medium">
                {getTransactionLabel(type)}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-3">{transactionDescriptions[type as keyof typeof transactionDescriptions]}</p>
                {renderCodeBlock(type as keyof typeof codeSnippets)}
                <button
                  type="button"
                  onClick={() => handleRunTransaction(type)}
                  className={`${selectedTransaction === type ? "bg-gray-600" : "bg-black"} px-3 py-1.5 rounded-md text-sm text-white self-center mt-2 hover:bg-gray-800 transition-colors`}
                >
                  {selectedTransaction === type
                    ? "Processing..."
                    : "Execute transaction →"}
                </button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}