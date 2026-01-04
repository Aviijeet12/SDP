"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, LogOut, Settings } from "lucide-react"

export default function DashboardNavbar() {
  const router = useRouter()

  return (
    <nav className="fixed top-0 w-full z-40 nav-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard/main" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-primary via-accent to-primary rounded-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Workspace
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-xl bg-white/10 border border-white/20 text-foreground hover:bg-white/20 transition-all duration-300">
            <Settings className="w-5 h-5" />
          </button>

          <div className="py-2 px-4 rounded-lg bg-card border border-border transition-all duration-300 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Alice</p>
              <p className="text-xs text-muted-foreground">alice@company.com</p>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-xl bg-white/10 border border-white/20 text-foreground hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
