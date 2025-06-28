import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/WalletContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "suiMark",
  description: "A decentralized platform for creators to mint, showcase, and sell their digital art as NFTs on the Sui blockchain.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletProvider>
          {children}
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
