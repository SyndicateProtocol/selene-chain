"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/Accordion"
import { useMoonPhase } from "@/lib/hooks"

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

  const currentPhase = useMoonPhase();


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


  const codeSnippets = {
    lowCalldata: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'newMoon',
  args: ['0x1234'] 
});
    `,
    contractCall: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waxingCrescent',
  args: []
});
    `,
    angelNumber: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'firstQuarter',
  args: ['0x268e0A6c79107f74Cf5Ef3067C110952e9127843'], // Moon contract
  value: BigInt(111), // Angel number: 111 wei
});
    `,
    waxingGibbous: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waxingGibbous',
  args: [],
});
    `,
    tokenTransfer: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'firstQuarter',
  args: ['0x268e0A6c79107f74Cf5Ef3067C110952e9127843'], // Moon contract
});
    `,
    highGas: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waningGibbous',
  args: [],
  gas: BigInt(2500000)  // High gas limit ≥ 2,000,000
});
    `,
    balancedGas: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'lastQuarter',
  args: [
    ["Message1", "Message2"], 
    ["0xRecipient1", "0xRecipient2"] 
  ],
  gas: BigInt(1200000)  // Appropriate for moderate calldata
});
    `,
    lowValue: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waningCrescent',
  args: [],
  value: BigInt(50000000000000), // 0.00005 ETH
});
    `
  }

  const transactionDescriptions = {
    lowCalldata: "Efficient transactions with minimal calldata (≤ 100 bytes), optimizing for lower costs.",
    contractCall: "Transactions targeting only the allowed Waxing Crescent contract call.",
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
        `⚠️ This transaction is not optimal during the ${currentPhase}. The sequencer won't process it.`
      )
    }

    // TODO: integrate transaction cloud
  }


  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "lowCalldata": return "Low calldata transaction";
      case "contractCall": return "Waxing Crescent contract call";
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
                  className={`${selectedTransaction === type ? "bg-gray-600" : "bg-black"} px-3 py-1.5 rounded-md text-sm text-white self-center mt-2`}
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