"use client"

import DashboardNavbar from "@/components/dashboard-navbar"

export default function OwnershipPage() {
  const transfers = [
    {
      id: 1,
      asset: "Digital_Certificate_001",
      from: "Alice Johnson",
      to: "Bob Smith",
      date: "2025-01-15",
      hash: "0x7f3d9c2e1a5b...",
    },
    {
      id: 2,
      asset: "Contract_Rights_V2",
      from: "Bob Smith",
      to: "Sarah Johnson",
      date: "2025-01-12",
      hash: "0x2e1a5b4f6e8d...",
    },
    {
      id: 3,
      asset: "IP_License_2025",
      from: "System",
      to: "Alice Johnson",
      date: "2025-01-10",
      hash: "0x4f6e8d3c1a9b...",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Ownership Transfer Logs</h1>
            <p className="text-muted-foreground">View complete ownership transfer history</p>
          </div>

          {/* Timeline */}
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-6">Transfer Timeline</h2>

            <div className="space-y-1 relative">
              {transfers.map((transfer, idx) => (
                <div key={transfer.id} className="flex gap-6 pb-6 relative">
                  {idx !== transfers.length - 1 && (
                    <div className="absolute left-[11px] top-8 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
                  )}

                  <div className="pt-1 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10 border-4 border-background">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex-1 glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{transfer.asset}</h3>
                      <span className="text-xs text-muted-foreground">{transfer.date}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs text-white">
                          {transfer.from.charAt(0)}
                        </div>
                        <span className="text-sm">{transfer.from}</span>
                      </div>

                      <span className="text-muted-foreground">→</span>

                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xs text-white">
                          {transfer.to.charAt(0)}
                        </div>
                        <span className="text-sm">{transfer.to}</span>
                      </div>
                    </div>

                    <div className="glass rounded p-3 text-xs">
                      <p className="text-muted-foreground mb-1">Transaction Hash</p>
                      <p className="font-mono text-foreground">{transfer.hash}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
