import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Geist, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"
import { headers } from "next/headers"

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
  const headersList = await headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/moon-phase`, {
    cache: "no-store"
  })
  const moonPhaseData = await res.json()

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
