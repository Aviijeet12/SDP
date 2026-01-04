"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Search, Eye, Copy, ExternalLink } from "lucide-react"

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContract, setSelectedContract] = useState<any | null>(null)

  const mockContracts = [
    {
      id: 1,
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      name: "Uniswap Token",
      symbol: "UNI",
      verified: true,
      transactions: 1245,
      holders: 892,
      events: [
        { name: "Transfer", count: 5432, latest: "2025-01-15T10:30:00Z" },
        { name: "Approval", count: 2341, latest: "2025-01-15T09:15:00Z" },
      ],
    },
    {
      id: 2,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      name: "USDC Stablecoin",
      symbol: "USDC",
      verified: true,
      transactions: 8932,
      holders: 4521,
      events: [
        { name: "Transfer", count: 12453, latest: "2025-01-15T10:45:00Z" },
        { name: "Approval", count: 5234, latest: "2025-01-15T10:40:00Z" },
      ],
    },
    {
      id: 3,
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      name: "DAI Stablecoin",
      symbol: "DAI",
      verified: true,
      transactions: 5621,
      holders: 3456,
      events: [
        { name: "Transfer", count: 8765, latest: "2025-01-15T10:35:00Z" },
        { name: "Approval", count: 3421, latest: "2025-01-15T10:25:00Z" },
      ],
    },
  ]

  const filtered = mockContracts.filter(
    (c) =>
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 glass rounded-full">
              <span className="text-sm font-medium text-primary">Contract Explorer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Smart Contract <span className="gradient-text">Explorer</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search contracts, view events, analyze transactions, and explore decoded parameters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Search */}
            <div className="md:col-span-1">
              <div className="glass-card">
                <h2 className="text-xl font-bold mb-4">Search Contracts</h2>

                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter address, name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input w-full pl-12"
                  />
                </div>

                <div className="space-y-3">
                  {filtered.map((contract) => (
                    <button
                      key={contract.id}
                      onClick={() => setSelectedContract(contract)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedContract?.id === contract.id
                          ? "glass bg-white/20 border-l-4 border-primary"
                          : "glass hover:bg-white/10"
                      }`}
                    >
                      <p className="font-semibold text-sm">{contract.name}</p>
                      <p className="text-xs text-muted-foreground font-mono truncate">{contract.address}</p>
                      <p className="text-xs text-primary mt-1">{contract.transactions} transactions</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2">
              {selectedContract ? (
                <div className="space-y-6">
                  {/* Contract Info */}
                  <div className="glass-card">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedContract.name}</h2>
                        <p className="text-muted-foreground">{selectedContract.symbol}</p>
                      </div>
                      {selectedContract.verified && (
                        <div className="px-3 py-1 glass rounded-full">
                          <p className="text-xs font-medium text-green-400">Verified</p>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="glass rounded-lg p-4 mb-6">
                      <p className="text-xs text-muted-foreground mb-2">Contract Address</p>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm flex-1 break-all text-primary">
                          {selectedContract.address}
                        </code>
                        <button className="p-2 glass rounded-lg hover:bg-white/20">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="glass rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{selectedContract.transactions}</p>
                        <p className="text-xs text-muted-foreground mt-1">Transactions</p>
                      </div>
                      <div className="glass rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{selectedContract.holders}</p>
                        <p className="text-xs text-muted-foreground mt-1">Holders</p>
                      </div>
                      <div className="glass rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{selectedContract.events.length}</p>
                        <p className="text-xs text-muted-foreground mt-1">Event Types</p>
                      </div>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="glass-card">
                    <h3 className="text-xl font-bold mb-4">Recent Events</h3>

                    <div className="space-y-3">
                      {selectedContract.events.map((event: any, idx: number) => (
                        <div key={idx} className="glass rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{event.name}</h4>
                            <span className="text-xs px-2 py-1 glass rounded-full text-primary">
                              {event.count} occurrences
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Last: {new Date(event.latest).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View on Etherscan */}
                  <button className="w-full glass-button bg-gradient-to-r from-primary to-accent text-white">
                    <ExternalLink className="w-4 h-4 inline mr-2" />
                    View on Etherscan
                  </button>
                </div>
              ) : (
                <div className="glass-card h-full flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Select a contract to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
