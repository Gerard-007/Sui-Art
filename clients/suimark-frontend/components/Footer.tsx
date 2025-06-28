import Link from "next/link"
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Social */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <span className="text-slate-900 dark:text-white font-bold text-2xl">SuiArt</span>
            </Link>

            <div className="flex space-x-4 mb-6">
              <Link
                href="#"
                className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-slate-700 dark:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Youtube className="w-5 h-5 text-slate-700 dark:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Twitter className="w-5 h-5 text-slate-700 dark:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Facebook className="w-5 h-5 text-slate-700 dark:text-white" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              href="/about"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/cultural-protection"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cultural Protection
            </Link>
            <Link
              href="/blog"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8">
          <p className="text-slate-500 dark:text-slate-400 text-center">©2025 Copyright SuiMark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
