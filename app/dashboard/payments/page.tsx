"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import { Send, ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react"

export default function PaymentsPage() {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [isSending, setIsSending] = useState(false)

  const transactions = [
    {
      id: 1,
      type: "sent",
      to: "john@company.com",
      amount: "0.5 ETH",
      usd: "$1,250",
      status: "confirmed",
      date: "2025-01-15",
    },
    {
      id: 2,
      type: "received",
      from: "Client XYZ",
      amount: "2.0 ETH",
      usd: "$5,000",
      status: "confirmed",
      date: "2025-01-14",
    },
    {
      id: 3,
      type: "sent",
      to: "vendor@crypto.io",
      amount: "1.25 ETH",
      usd: "$3,125",
      status: "pending",
      date: "2025-01-14",
    },
  ]

  const handleSend = () => {
    if (!recipientAddress || !transferAmount) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setRecipientAddress("")
      setTransferAmount("")
      alert("Transaction sent successfully!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Cross-Border Crypto Payments</h1>
            <p className="text-muted-foreground">Send and receive payments globally with minimal fees</p>
          </div>

          {/* Balance Card */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/40 rounded-lg mb-12 p-8">
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
              <h2 className="text-5xl font-bold gradient-text mb-2">2.45 ETH</h2>
              <p className="text-lg text-muted-foreground">≈ $6,125 USD</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-semibold">Quick Transfer</p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Recipient address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-primary/30 focus:border-primary outline-none transition-colors"
                  />
                  <input
                    type="number"
                    placeholder="Amount (ETH)"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-primary/30 focus:border-primary outline-none transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isSending || !recipientAddress || !transferAmount}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg disabled:opacity-50 transition-all font-medium"
                  >
                    <Send className="w-4 h-4 inline mr-2" />
                    {isSending ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3 font-semibold">Exchange Rate</p>
                <div className="space-y-2">
                  <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg p-4 flex justify-between items-center hover:bg-white/10 transition-colors">
                    <span className="font-medium">1 ETH</span>
                    <span className="text-xl font-bold gradient-text">$2,500</span>
                  </div>
                  <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg p-4 flex justify-between items-center hover:bg-white/10 transition-colors">
                    <span className="font-medium">1 USDC</span>
                    <span className="text-xl font-bold gradient-text">$1.00</span>
                  </div>
                  <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg p-4 flex justify-between items-center hover:bg-white/10 transition-colors">
                    <span className="font-medium">1 BTC</span>
                    <span className="text-xl font-bold gradient-text">$45,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Transaction History</h2>
            </div>

            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="backdrop-blur-lg bg-white/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-3 rounded-lg ${tx.type === "sent" ? "bg-red-500/20 border border-red-500/30" : "bg-green-500/20 border border-green-500/30"}`}
                    >
                      {tx.type === "sent" ? (
                        <ArrowUpRight className="w-6 h-6 text-red-400" />
                      ) : (
                        <ArrowDownLeft className="w-6 h-6 text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">
                        {tx.type === "sent" ? `Send to ${tx.to}` : `Received from ${tx.from}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{tx.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-bold text-lg ${tx.type === "sent" ? "text-red-400" : "text-green-400"}`}>
                      {tx.type === "sent" ? "-" : "+"}
                      {tx.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.usd}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full mt-2 inline-block font-medium ${
                        tx.status === "confirmed"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {tx.status}
                    </span>
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
