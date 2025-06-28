"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import NFTModal from "@/components/NFTModal"

const categories = ["All Collection", "Art NFT", "Design", "Sculpture", "Photograph", "Anime", "Others"]

const nftData = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  name: "ArtName",
  creator: "Creator's name",
  price: "0.36",
  image: `/placeholder.svg?height=300&width=300`,
}))

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Collection")
  const [searchQuery, setSearchQuery] = useState("")

  type NFT = {
    id: number
    name: string
    creator: string
    price: string
    image: string
  }
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Type your keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 h-12 rounded-full"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 p-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {nftData.map((nft) => (
            <Card
              key={nft.id}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-600 relative">
                <div className="absolute inset-4 bg-black/20 rounded border-2 border-orange-300/50 flex items-center justify-center">
                  <div className="text-4xl">🎨</div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{nft.creator}</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{nft.name}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{nft.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent"
          >
            Load More!
          </Button>
        </div>
      </div>

      <Footer />

      {selectedNFT && <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
    </div>
  )
}
