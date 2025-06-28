"use client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Coins, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-20 px-4 text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-background.png')`,
        }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80"></div>

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Own Your Story.
            <br />
            <span className="text-blue-500 dark:text-blue-400">Empower Yourself as a Creator.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Restoring value, voice, and ownership to real artisans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mint">
              <Button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 text-lg">Mint Your NFTs</Button>
            </Link>
            <Link href="/marketplace">
              <Button
                variant="outline"
                className="border-slate-600 dark:border-slate-600 border-slate-300 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-3 text-lg bg-transparent"
              >
                Explore Art
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Turn Passion into Ownership. And Ownership into Earnings in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Edit className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Create Your Art</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Bring your unique expression to life, digitally or physically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Coins className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Mint as NFT</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Upload and secure your art on the blockchain. Every piece gets a digital proof of ownership.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Thrive</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Sell, earn, and build your reputation as an authentic Nigerian artisan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Artwork */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured art work</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1].map((item) => (
              <Card key={item} className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-600 relative">
                  <div className="absolute inset-4 bg-black/20 rounded border-2 border-orange-300/50"></div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">ArtName</span>
                    <span className="text-sm font-bold text-white">0.36</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-800 border-slate-700 overflow-hidden mt-5">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="text-4xl">🎨</div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">Own Your Story, Digitalize Your Art.</h3>
                <Link href="/mint">
                  <Button className="bg-blue-500 hover:bg-blue-600 w-fit">Mint Your NFTs</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
