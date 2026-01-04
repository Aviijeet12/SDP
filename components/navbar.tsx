"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Lock } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Smart Contracts", href: "/contracts/generate" },
    { label: "Templates", href: "/templates" },
    { label: "Security", href: "/security" },
    { label: "Learning", href: "/sandbox" },
    { label: "Verify", href: "/verify" },
    { label: "Explorer", href: "/explorer" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 nav-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:inline gradient-text">BlockChain</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/dashboard/auth"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium transition-all duration-300 active:scale-95 hover:shadow-lg"
          >
            Access Portal
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-white/10 border border-white/20 text-foreground hover:bg-white/20 transition-all duration-300"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 mx-4 rounded-lg bg-white/10 border border-white/20 p-4 md:hidden smooth-fade">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-4 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard/auth"
              className="block mt-4 py-2 px-4 rounded-lg text-center font-medium text-primary hover:text-primary/80 transition-colors bg-white/10 border border-white/20"
            >
              Access Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
