"use client"
import { lunarPhases } from "@/lib/constants"
import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"

export default function HowTo() {
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const lunarPhase = lunarPhases.find(
    (phase) => phase.name === "Waning Gibbous Moon"
  )

  const codeSnippet = `
const tx = await contract.executeHighGasPriorityTransaction({
  value: ethers.utils.parseEther("0.1"),  
  gasLimit: 500000,  // High gas limit to prioritize this transaction
});
  `

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(codeSnippet, {
          lang: "typescript",
          theme: "tokyo-night"
        })
        setHighlightedCode(html)
      } catch (error) {
        console.error("Error highlighting code:", error)
        // Fallback to the original code without highlighting
        setHighlightedCode(`<pre><code>${codeSnippet}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }

    highlightCode()
  }, [])

  return (
    <div className="p-1 bg-transparent-gray rounded-xl  my-12 self-baseline max-w-full">
      <div className="">
        <div className="font-medium text-3xl">
          How to interact with the contract?
        </div>
        <div className="max-w-prose">
          <p className="text-sm leading-none">
            The current lunar phase is{" "}
            <span className=" text-black underline inline-block">
              {lunarPhase?.name}
              <span className="font-moonphases pl-1 align-bottom">
                {lunarPhase?.symbol}
              </span>
            </span>
            <br /> <br />
          </p>
          <p className="text-sm leading-none">
            This phase prioritizes transactions with higher gas limits, making
            them more likely to be included in the next block. To interact with
            the contract, you can run the following transaction:
          </p>
        </div>
        {isLoading ? (
          <code className="block my-2 text-[10px]">{codeSnippet}</code>
        ) : (
          <div
            className="block my-2 text-[10px]"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        )}

        <button
          type="button"
          className="bg-black px-2 py-1 rounded-md text-sm text-white self-center"
        >
          run transaction →
        </button>
      </div>
    </div>
  )
}
