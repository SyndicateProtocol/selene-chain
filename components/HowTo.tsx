export default function HowTo() {
  // TODO: use shiki to highlight the code
  return (
    <div className="max-w-96 p-1 my-12">
      <div className=" font-medium text-base">
        How to interact with the contract?
        <code className="block my-2 text-[10px]">
          {`
          const tx = await contract.executeHighGasPriorityTransaction({
    
    
          value: ethers.utils.parseEther("0.1"),  // Optional ETH value to send
    
    
    
          gasLimit: 500000,  // High gas limit to prioritize this transaction
});
`}
        </code>
        <button
          type="button"
          className="bg-blue px-2 py-1 rounded-md text-sm text-white"
        >
          run transaction
        </button>
      </div>
    </div>
  )
}
