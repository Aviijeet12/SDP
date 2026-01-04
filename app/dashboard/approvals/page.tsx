"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import { CheckCircle, MessageCircle, Clock, User, FileText, ThumbsUp, ThumbsDown } from "lucide-react"

export default function ApprovalsPage() {
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 1,
      document: "Legal_Agreement_2025.pdf",
      submittedBy: "John Doe",
      submittedDate: "2025-01-14",
      desc: "Q1 Partnership Agreement review needed",
      priority: "high",
      comments: [],
      reviewNotes: "",
    },
    {
      id: 2,
      document: "Contract_Draft.docx",
      submittedBy: "Sarah Johnson",
      submittedDate: "2025-01-13",
      desc: "Service contract for vendor approval",
      priority: "medium",
      comments: [],
      reviewNotes: "",
    },
    {
      id: 3,
      document: "Financial_Report_Q4.xlsx",
      submittedBy: "Mike Chen",
      submittedDate: "2025-01-12",
      desc: "Annual financial statements review",
      priority: "high",
      comments: [],
      reviewNotes: "",
    },
  ])

  const [selectedReview, setSelectedReview] = useState(null)

  const handleApprove = (id) => {
    setPendingReviews(pendingReviews.filter((r) => r.id !== id))
  }

  const handleReject = (id) => {
    setPendingReviews(pendingReviews.filter((r) => r.id !== id))
  }

  const stats = [
    { label: "Pending Reviews", value: pendingReviews.length, icon: "⏳", color: "yellow" },
    { label: "Approved", value: 12, icon: "✓", color: "green" },
    { label: "Rejected", value: 2, icon: "✕", color: "red" },
    { label: "Avg. Review Time", value: "2.4 hrs", icon: "🕐", color: "blue" },
  ]

  const colorMap = {
    yellow: "from-yellow-500 to-orange-500",
    green: "from-green-500 to-emerald-500",
    red: "from-red-500 to-red-400",
    blue: "from-blue-500 to-cyan-500",
  }

  const priorityColor = {
    high: "from-red-500 to-orange-500",
    medium: "from-yellow-500 to-orange-500",
    low: "from-green-500 to-emerald-500",
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Approval Workflow
            </h1>
            <p className="text-muted-foreground text-lg">Review and approve pending documents in real-time</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br ${colorMap[stat.color]} bg-opacity-10`}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-8">
            <h2 className="text-2xl font-bold mb-8">Pending Review Queue</h2>

            {pendingReviews.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
                <p className="text-xl font-semibold mb-2">All Set!</p>
                <p className="text-muted-foreground">No pending reviews at the moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-white/10 backdrop-blur-lg bg-white/5 p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{review.document}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${priorityColor[review.priority]} text-white`}
                          >
                            {review.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Submitted by <span className="text-foreground font-medium">{review.submittedBy}</span> on{" "}
                          {review.submittedDate}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
                      {review.desc}
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                          <FileText className="w-3 h-3" />
                          Document Hash
                        </p>
                        <p className="font-mono text-sm text-primary truncate">0x7f3d9c2e1a5b4f6e</p>
                      </div>
                      <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          Submitted
                        </p>
                        <p className="font-semibold text-white">{review.submittedDate}</p>
                      </div>
                      <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                        <p className="text-xs text-muted-foreground mb-2">File Size</p>
                        <p className="font-semibold text-white">2.4 MB</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-semibold mb-2 block">Review Comments</label>
                      <textarea
                        value={review.reviewNotes}
                        onChange={(e) =>
                          setPendingReviews(
                            pendingReviews.map((r) => (r.id === review.id ? { ...r, reviewNotes: e.target.value } : r)),
                          )
                        }
                        placeholder="Add your detailed review comments here..."
                        className="w-full h-24 resize-none rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/50 transition-all"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-red-500 to-red-400 text-white hover:shadow-lg hover:shadow-red-500/50 transition-all"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Reject
                      </button>
                      <button className="px-4 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/10 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
