"use client"

import Guide from "@/components/Guide"

import MoonPhase from "@/components/MoonPhase"
import TxPoller from "@/components/TxPoller"
import dynamic from "next/dynamic"

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false
})

const HowTo = dynamic(() => import("@/components/HowTo"), {
  ssr: false
})

export default function Home() {
  return (
    <section className="font-geist">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 lg:col-span-2">
            <h1 className="text-5xl inline-block max-w-[20ch]">
              <span className="whitespace-nowrap">
                <MoonPhase />
                <span>nchain</span>
              </span>{" "}
              transactions sequenced by lunar phases
            </h1>
          </div>
          <div className="md:col-span-2 lg:col-span-1 p-4 bg-white/40 backdrop-blur-sm rounded-xl">
            <p className="text-sm">
              This site tracks lunar phases and transactions on Selene chain...{" "}
              <span className="bold font-medium">
                Where blockchain meets celestial mechanics 🌟
              </span>{" "}
              The lunar sequencer prioritizes transactions based on the current
              phase of the moon.{" "}
              <a
                href="https://syndicate.io/"
                target="_blank"
                className="underline"
                rel="noreferrer"
              >
                Syndicate
              </a>{" "}
              enables new dynamics for sequencers onchain, and in this example,
              the sequencer is controlled by lunar cycles.
            </p>
          </div>
          <div className="lg:col-span-1">
            <Guide />
          </div>
          <div className="lg:col-span-1">
            <HowTo />
          </div>
          <div className="lg:col-span-1">
            <TxPoller />
          </div>
        </div>
      </div>
      <ModelViewer />
    </section>
  )
}
