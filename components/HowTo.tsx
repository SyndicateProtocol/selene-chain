"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/Accordion"
import { lunarPreferences } from "@/lib/constants"
import { useMoonPhase, useRefreshTransactions, useSendTransaction } from "@/lib/hooks"

import { useCallback, useEffect, useMemo, useState } from "react"
import { codeToHtml } from "shiki"

const TRANSACTION_TYPES = [
  "lowCalldata",
  "contractCall",
  "angelNumber",
  "waxingGibbous",
  "tokenTransfer",
  "highGas",
  "balancedGas",
  "lowValue"
] as const;

type TransactionType = typeof TRANSACTION_TYPES[number];

interface TransactionConfig {
  functionSignature: string;
  args: Record<string, any>;
  value?: string;
}

interface TransactionInfo {
  description: string;
  code: string;
  config: TransactionConfig;
  label: string;
}

export default function HowTo() {
  const [highlightedCodes, setHighlightedCodes] = useState<{
    [key in TransactionType]?: string
  }>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [successfulTx, setSuccessfulTx] = useState<TransactionType | null>(null)
  const [cooldownTx, setCooldownTx] = useState<TransactionType | null>(null)

  const currentPhase = useMoonPhase();
  const {
    sendTransaction,
    isLoading: isTransactionLoading,
  } = useSendTransaction();

  const refreshTransactions = useRefreshTransactions();


  const transactionInfo = useMemo<Record<TransactionType, TransactionInfo>>(() => ({
    lowCalldata: {
      description: "Efficient transactions with minimal calldata (≤ 100 bytes), optimizing for lower costs.",
      code: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'newMoon',
  args: ['0x1234'] 
});
      `,
      config: {
        functionSignature: "newMoon(string)",
        args: { "0": "0x1234" }
      },
      label: "Low calldata transaction"
    },
    contractCall: {
      description: "Transactions targeting only the allowed Waxing Crescent contract call.",
      code: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waxingCrescent',
  args: []
});
      `,
      config: {
        functionSignature: "waxingCrescent()",
        args: {}
      },
      label: "Waxing Crescent contract call"
    },
    angelNumber: {
      description: "Transactions with angel numbers as ETH values (e.g., 0.333 ETH, 0.555 ETH).",
      code: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'firstQuarter',
  args: ['0x75020317574aB0003A0D8B30F795c42b97d566F8'], // Moon contract
  value: BigInt(111), // Angel number: 111 wei
});
      `,
      config: {
        functionSignature: "firstQuarter(address)",
        args: { "0": "0x75020317574aB0003A0D8B30F795c42b97d566F8" },
        value: "111" // Angel number
      },
      label: "Angel number donation"
    },
    waxingGibbous: {
      description: "Transactions that specifically call the waxingGibbous() function.",
      code: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waxingGibbous',
  args: [],
});
      `,
      config: {
        functionSignature: "waxingGibbous()",
        args: {}
      },
      label: "Waxing Gibbous function call"
    },
    tokenTransfer: {
      description: "Transactions interacting with ERC20, ERC721, or ERC1155 token contracts.",
      code: `
const hash = await walletClient.writeContract({
  address: 0x49436F4956E80D9e27826ec6e43f06b9a4E54C69, // ERC20 token contract
  abi: ERC20Abi,
  functionName: 'mint',
  args: ['0x75020317574aB0003A0D8B30F795c42b97d566F8', 1000000000000000000],
});
      `,
      config: {
        functionSignature: "mint(address,uint256)",
        args: { "0": "0x49436F4956E80D9e27826ec6e43f06b9a4E54C69", "1": "1" },
      },
      label: "Token transfer"
    },
    highGas: {
      description: "Gas-heavy transactions with gas limit ≥ 2,000,000 units.",
      code: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waningGibbous',
  args: [],
  gas: BigInt(2500000)  // High gas limit ≥ 2,000,000
});
      `,
      config: {
        functionSignature: "waningGibbous()",
        args: {}
      },
      label: "High gas transaction"
    },
    balancedGas: {
      description: "Balanced transactions with gas limit ≥ 1,000,000 and calldata ≤ 1,000 bytes.",
      code: `
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
      config: {
        functionSignature: "lastQuarter(string[],address[])",
        args: {
          "0": ["Message1", "Message2"],
          "1": ["0x1234567890123456789012345678901234567890", "0x1234567890123456789012345678901234567890"]
        }
      },
      label: "Balanced gas transaction"
    },
    lowValue: {
      description: "Low value transactions (≤ 0.1 ETH).",
      code: `
const hash = await walletClient.writeContract({
  address: moonPhaseContract.address,
  abi: moonPhaseAbi,
  functionName: 'waningCrescent',
  args: [],
  value: BigInt(50000000000000), // 0.00005 ETH
});
      `,
      config: {
        functionSignature: "waningCrescent()",
        args: {},
        value: "50000000000000" // 0.00005 ETH
      },
      label: "Low value transaction"
    }
  }), []);


  // Highlight all code blocks
  useEffect(() => {
    const highlightAllCode = async () => {
      try {
        const promises = TRANSACTION_TYPES.map(async (type) => {
          const html = await codeToHtml(transactionInfo[type].code, {
            lang: "typescript",
            theme: "tokyo-night"
          });
          return [type, html];
        });

        const results = await Promise.all(promises);
        setHighlightedCodes(Object.fromEntries(results));
      } catch (error) {
        console.error("Error highlighting code:", error);
        // Fallback to the original code without highlighting
        const fallbackObject = Object.fromEntries(
          TRANSACTION_TYPES.map((type) => [
            type,
            `<pre><code>${transactionInfo[type].code}</code></pre>`
          ])
        );
        setHighlightedCodes(fallbackObject);
      } finally {
        setIsLoading(false);
      }
    };

    highlightAllCode();
  }, [transactionInfo]);

  // Reset successful transaction state after timeout
  useEffect(() => {
    if (successfulTx) {
      // Set cooldown state
      setCooldownTx(successfulTx);

      // Start a timer to clear the success state
      const timer = setTimeout(() => {
        setSuccessfulTx(null);
        setTimeout(() => {
          setCooldownTx(null);
        }, 500);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [successfulTx]);


  const renderCodeBlock = useCallback((type: TransactionType) => {
    if (isLoading) {
      return <code className="block my-2 text-[10px]">{transactionInfo[type].code}</code>;
    }

    return (
      <div
        className="block my-2 text-[10px]"
        dangerouslySetInnerHTML={{ __html: highlightedCodes[type] || "" }}
      />
    );
  }, [isLoading, highlightedCodes, transactionInfo]);


  const handleRunTransaction = useCallback(async (type: TransactionType) => {
    setSelectedTransaction(type);
    setFeedback(null);
    setSuccessfulTx(null);

    const isPreferred = type === lunarPreferences[currentPhase];

    try {
      const config = transactionInfo[type].config;
      await sendTransaction(
        config.functionSignature,
        config.args,
        {
          value: config.value,
        }
      );

      setSuccessfulTx(type);
      setSelectedTransaction(null);
      refreshTransactions();

      if (isPreferred) {
        setFeedback(
          `✨ Great choice! The ${currentPhase} favors this type of transaction. Your transaction is being processed with priority.`
        );
      } else {
        setFeedback(
          `⚠️ This transaction is not optimal during the ${currentPhase}. The sequencer won't process it. Try another type!`
        );
      }

    } catch (err) {
      setFeedback(
        `❌ Transaction failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      // Set selectedTransaction to null so failed transactions can be retried immediately
      setSelectedTransaction(null);
    }
  }, [transactionInfo, sendTransaction, currentPhase, refreshTransactions]);


  const getButtonText = useCallback((type: TransactionType) => {
    if (selectedTransaction === type) {
      return "Processing...";
    } else if (successfulTx === type) {
      return "Transaction sent ✓";
    } else if (cooldownTx === type) {
      return "Please wait...";
    } else if (isTransactionLoading) {
      return "Please wait...";
    } else {
      return "Execute transaction →";
    }
  }, [selectedTransaction, successfulTx, cooldownTx, isTransactionLoading]);

  const getButtonStyle = (type: TransactionType) => {
    if (selectedTransaction === type) {
      return "bg-gray-600";
    } else if (cooldownTx === type || isTransactionLoading || (selectedTransaction !== null && selectedTransaction !== type)) {
      return "bg-gray-500 cursor-not-allowed";
    } else {
      return "bg-black hover:bg-gray-800";
    }
  }

  const isButtonDisabled = (type: TransactionType) => {
    return isTransactionLoading ||
      (selectedTransaction !== null && selectedTransaction !== type) ||
      cooldownTx === type;
  }


  const feedbackStyle = !feedback ? "" :
    feedback.includes("Great") ? "bg-green-100" :
      feedback.includes("❌") ? "bg-red-100" :
        "bg-yellow-100";

  return (
    <div className="p-1 bg-white/40 border border-gray-light backdrop-blur-sm rounded-xl self-baseline max-w-full">
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
          <div className={`p-3 mb-4 rounded-lg ${feedbackStyle}`}>
            <p className="text-sm">{feedback}</p>
          </div>
        )}

        <Accordion type="single" collapsible className="w-full">
          {TRANSACTION_TYPES.map((type) => (
            <AccordionItem key={type} value={type}>
              <AccordionTrigger className="font-medium">
                {transactionInfo[type].label}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-3">{transactionInfo[type].description}</p>
                {renderCodeBlock(type)}
                <button
                  type="button"
                  onClick={() => handleRunTransaction(type)}
                  disabled={isButtonDisabled(type)}
                  className={`${getButtonStyle(type)} px-3 py-1.5 rounded-md text-sm text-white self-center mt-2 transition-colors`}
                >
                  {getButtonText(type)}
                </button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}