"use client"

import DashboardNavbar from "@/components/dashboard-navbar"
import { Filter, Download } from "lucide-react"

export default function AuditPage() {
  const events = [
    {
      id: 1,
      action: "Document Verified",
      user: "Alice Johnson",
      asset: "Legal_Agreement_2025.pdf",
      timestamp: "2025-01-15T10:30:00Z",
      hash: "0x7f3d9c2e1a5b...",
      block: "21456789",
    },
    {
      id: 2,
      action: "Access Granted",
      user: "Alice Johnson",
      asset: "Q1_Reports",
      timestamp: "2025-01-15T09:15:00Z",
      hash: "0x2e1a5b4f6e8d...",
      block: "21456788",
    },
    {
      id: 3,
      action: "Document Uploaded",
      user: "Bob Smith",
      asset: "Contract_Draft.docx",
      timestamp: "2025-01-14T14:22:00Z",
      hash: "0x4f6e8d3c1a9b...",
      block: "21456787",
    },
    {
      id: 4,
      action: "Ownership Transferred",
      user: "System",
      asset: "Digital_Certificate_001",
      timestamp: "2025-01-13T11:00:00Z",
      hash: "0x8d3c1a9b2f7e...",
      block: "21456786",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">Blockchain Audit Trail</h1>
              <p className="text-muted-foreground">Complete chronological record of all transactions</p>
            </div>
            <button className="glass-button text-foreground hover:bg-white/20">
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
          </div>

          {/* Filters */}
          <div className="glass-card mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input type="text" placeholder="Search by user, asset, or hash..." className="glass-input w-full" />
              </div>
              <button className="glass-button text-foreground hover:bg-white/20">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-6">Event Timeline</h2>

            <div className="space-y-1 relative">
              {events.map((event, idx) => (
                <div key={event.id} className="flex gap-6 pb-6 relative">
                  {/* Timeline Line */}
                  {idx !== events.length - 1 && (
                    <div className="absolute left-[11px] top-8 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
                  )}

                  {/* Timeline Dot */}
                  <div className="pt-1 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10 border-4 border-background">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{event.action}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          by <span className="text-foreground">{event.user}</span>
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-sm text-primary mb-3">{event.asset}</p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="glass rounded p-2">
                        <p className="text-muted-foreground">Block</p>
                        <p className="font-mono text-foreground">{event.block}</p>
                      </div>
                      <div className="glass rounded p-2">
                        <p className="text-muted-foreground">Hash</p>
                        <p className="font-mono text-foreground truncate">{event.hash}</p>
                      </div>
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
