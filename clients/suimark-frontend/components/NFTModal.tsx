"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, Verified } from "lucide-react"

interface NFTModalProps {
  nft: {
    id: number
    name: string
    creator: string
    price: string
  }
  onClose: () => void
}

export default function NFTModal({ nft, onClose }: NFTModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* NFT Image */}
          <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-600 rounded-lg relative">
            <div className="absolute inset-4 bg-black/20 rounded border-2 border-orange-300/50 flex items-center justify-center">
              <div className="text-8xl">🐐</div>
            </div>

            {/* Owner Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-slate-100/90 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-400 mb-2">Owned by</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">U1</AvatarFallback>
                    </Avatar>
                    <span className="text-white font-medium">User 12345</span>
                    <Verified className="w-4 h-4 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            {/* Close Button */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Title and Creator */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sui - Goat #111</h1>
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">UV</AvatarFallback>
                </Avatar>
                <span className="text-slate-600 dark:text-slate-300">UbuntuVisuals</span>
                <Verified className="w-4 h-4 text-blue-400" />
              </div>
            </div>

            {/* Price and Buy */}
            <Card className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
              <CardContent className="p-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Buy for</p>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">5.45</span>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 h-12 text-lg">Buy Now</Button>
              </CardContent>
            </Card>

            {/* About NFT */}
            <Card className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">About NFT</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  Sui-goat #111, affectionately known as The Griot's Echo, is not just an NFT, it's a digital embodiment
                  of ancestral wisdom and raw creative fire. Draped in Kente fiber patterns and holding a staff shaped
                  like a talking drum, this goat is the storyteller of the blockchain. It whispers tales of forgotten
                  kingdoms, cosmic drums, and moonlit dances along the Sahel. Its eyes glow with the binary codes of
                  history, each blink decoding ancient innovation
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Special Traits:</h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    <p>Ancestral Frequency Horns (Emit audio-reactive waveforms)</p>
                    <p>Pan-African Cloak (Animated texture woven with smart contract fibers)</p>
                    <p>Sui water droplet symbol</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
