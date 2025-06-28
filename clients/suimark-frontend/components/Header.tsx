'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { WalletContext } from '@/components/WalletContext';

export default function Header() {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <span className="text-slate-900 dark:text-white font-bold text-xl">SuiMark</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/marketplace"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Explore Art
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              My NFTs
            </Link>
            <Link
              href="/mint"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Mint NFTs
            </Link>
          </nav>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-3)}` : '0x752...b5a'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="text-white hover:bg-slate-700">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={disconnectWallet} className="text-red-400 hover:bg-slate-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
              >
                Connect Wallet →
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-900 dark:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700 dark:border-slate-200">
            <nav className="flex flex-col space-y-4">
              <ThemeToggle />
              <Link
                href="/marketplace"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore Art
              </Link>
              <Link
                href="/dashboard"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My NFTs
              </Link>
              <Link
                href="/mint"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mint NFTs
              </Link>
              {isConnected ? (
                <div className="pt-4 border-t border-slate-700">
                  <div className="text-slate-900 dark:text-white mb-2">
                    {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-3)}` : '0x752...b5a'}
                  </div>
                  <Button
                    onClick={disconnectWallet}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10 w-full bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 w-full"
                >
                  Connect Wallet →
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}