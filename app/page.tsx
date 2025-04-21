"use client"

import Guide from "@/components/Guide"
import HowTo from "@/components/HowTo"
import MoonPhase from "@/components/MoonPhase"
import dynamic from "next/dynamic"

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false
})

export default function Home() {
  return (
    <section className="font-geist">
      <div className="p-4">
        <h1 className=" text-5xl inline-block max-w-[20ch]">
          <span className="whitespace-nowrap">
            <MoonPhase />
            <span>nchain</span>
          </span>{" "}
          transactions sequenced by lunar phases
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 ">
          <Guide />
          <HowTo />
        </div>
      </div>
      <ModelViewer />
    </section>
  )
}
