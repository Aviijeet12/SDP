"use client"

import DashboardNavbar from "@/components/dashboard-navbar"
import { Award, Download, QrCode } from "lucide-react"

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      title: "Blockchain Developer",
      recipient: "John Doe",
      issuedDate: "2025-01-10",
      expiryDate: "2026-01-10",
      hash: "0x7f3d9c2e1a5b...",
    },
    {
      id: 2,
      title: "Smart Contract Auditor",
      recipient: "Sarah Johnson",
      issuedDate: "2024-12-15",
      expiryDate: "2025-12-15",
      hash: "0x2e1a5b4f6e8d...",
    },
    {
      id: 3,
      title: "DeFi Specialist",
      recipient: "Mike Chen",
      issuedDate: "2024-11-20",
      expiryDate: "2025-11-20",
      hash: "0x4f6e8d3c1a9b...",
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
              <h1 className="text-4xl font-bold mb-2">Digital Certificates</h1>
              <p className="text-muted-foreground">Manage and verify digital certificates</p>
            </div>
            <button className="glass-button bg-gradient-to-r from-primary to-accent text-white">
              <Award className="w-4 h-4 inline mr-2" />
              Issue Certificate
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Total Issued", value: 42, icon: "📜" },
              { label: "Active", value: 38, icon: "✓" },
              { label: "Expired", value: 4, icon: "⏰" },
            ].map((stat, idx) => (
              <div key={idx} className="glass-card">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Certificates */}
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="glass-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Issued to {cert.recipient}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 glass rounded-lg hover:bg-white/20">
                      <QrCode className="w-5 h-5" />
                    </button>
                    <button className="p-2 glass rounded-lg hover:bg-white/20">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="glass rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Issued Date</p>
                    <p className="font-semibold">{cert.issuedDate}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Expiry Date</p>
                    <p className="font-semibold">{cert.expiryDate}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Certificate Hash</p>
                    <p className="font-mono text-sm truncate">{cert.hash}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
