"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Profile */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-slate-700 text-white">0x</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Wallet Address</p>
                <p className="font-mono">0x752...b5a</p>
              </div>
            </CardContent>
          </Card>

          {/* NET Worth */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">NET Worth</p>
              <p className="text-2xl font-bold">$33.0</p>
            </CardContent>
          </Card>

          {/* Verify Button */}
          <Card className="bg-blue-500 border-blue-400">
            <CardContent className="p-6 flex items-center justify-center">
              <Button variant="ghost" className="text-white hover:bg-blue-600 w-full h-full">
                Verify to be an artists
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My NFTs Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My NFTs</h2>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4 opacity-50">📦</div>
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No Items found</h3>
              <p className="text-slate-500 mb-6">
                You haven't minted any NFTs yet. Start creating your digital art collection!
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">Mint Your First NFT</Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">NFTs Owned</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">NFTs Created</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Collections</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold">$0</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Sales</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
