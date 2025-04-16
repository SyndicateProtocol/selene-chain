"use client"
import dynamic from "next/dynamic"

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false
})

export default function Home() {
  return (
    <div>
      <h1 className="font-decovar font-geist text-6xl">
        onchain transactions sequenced by lunar phases
      </h1>
      <ModelViewer />
    </div>
  )
}
