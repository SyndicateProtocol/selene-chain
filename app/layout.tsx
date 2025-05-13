import { Providers } from "@/components/Providers"
import { getMoonPhaseData } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Geist, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Lunar Phase Transactions",
  description: "Decentralized onchain transactions sequenced by lunar phases"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const moonPhaseData = await getMoonPhaseData()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <Providers value={moonPhaseData}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"
