"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon } from "lucide-react"

export default function MintPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  })
  const [imageFile, setImageFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleMint = () => {
    console.log("Minting NFT:", { formData, imageFile })
    // Handle minting logic here
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Digitalize your art work</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Turn your original artwork into a digital asset secured on the blockchain. Minting gives you full ownership,
            verifiable proof, and royalty earnings every time it's sold, even in the future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-96 mb-4">
              <CardContent className="p-0 h-full">
                <div
                  className={`h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                    dragActive ? "border-blue-400 bg-blue-400/10" : "border-slate-600 hover:border-slate-500"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imageFile ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{imageFile.name}</p>
                      <Button
                        variant="outline"
                        className="mt-4 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent"
                        onClick={() => setImageFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">Upload Image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button
                          variant="outline"
                          className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent"
                          asChild
                        >
                          <span>Choose File</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-slate-400">
              File types supported: JPG, JPEG, PNG, WEBP. Maximum size after conversion: 250 KB
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <Input
                name="name"
                placeholder="Enter your NFT name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 h-12"
              />
            </div>

            <div>
              <Textarea
                name="description"
                placeholder="NFT Description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 min-h-24"
              />
            </div>

            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">More details:</p>
              <Input
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 h-12"
              />
            </div>

            <Button
              onClick={handleMint}
              className="w-full bg-blue-500 hover:bg-blue-600 h-12 text-lg font-medium"
              disabled={!imageFile || !formData.name || !formData.description}
            >
              Mint NFT
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
