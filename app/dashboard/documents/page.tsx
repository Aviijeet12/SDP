"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Download,
  Eye,
  Trash2,
  Clock,
  File,
} from "lucide-react"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Legal_Agreement_2025.pdf",
      size: "2.4 MB",
      status: "verified",
      uploadDate: "2025-01-15",
      hash: "0x7f3d9c2e1a5b...",
      versions: 3,
      category: "Legal",
      uploadedBy: "John Doe",
      lastModified: "2025-01-15",
    },
    {
      id: 2,
      name: "Contract_Draft.docx",
      size: "1.2 MB",
      status: "pending",
      uploadDate: "2025-01-14",
      hash: "0x2e1a5b4f6e8d...",
      versions: 2,
      category: "Contracts",
      uploadedBy: "Sarah Johnson",
      lastModified: "2025-01-14",
    },
    {
      id: 3,
      name: "Financial_Report_Q4.xlsx",
      size: "5.1 MB",
      status: "verified",
      uploadDate: "2025-01-13",
      hash: "0x4f6e8d3c1a9b...",
      versions: 1,
      category: "Finance",
      uploadedBy: "Mike Chen",
      lastModified: "2025-01-13",
    },
    {
      id: 4,
      name: "Security_Audit_Report.pdf",
      size: "3.8 MB",
      status: "verified",
      uploadDate: "2025-01-12",
      hash: "0x9c8b7a6f5e4d...",
      versions: 1,
      category: "Security",
      uploadedBy: "Alex Brown",
      lastModified: "2025-01-12",
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedDoc, setExpandedDoc] = useState(null)

  const stats = [
    { label: "Total Documents", value: 24, icon: "📄", bgGradient: "from-blue-500 to-cyan-500" },
    { label: "Verified", value: "98%", icon: "✓", bgGradient: "from-green-500 to-emerald-500" },
    { label: "Storage Used", value: "12.4 GB", icon: "💾", bgGradient: "from-orange-500 to-red-500" },
    { label: "Last Updated", value: "2 hrs ago", icon: "🕐", bgGradient: "from-primary to-accent" },
  ]

  const categories = ["All", "Legal", "Contracts", "Finance", "Security"]

  const filteredDocs =
    selectedCategory === "All" ? documents : documents.filter((doc) => doc.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Document Management
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload, verify, and manage your blockchain-verified documents with ease
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br ${stat.bgGradient} bg-opacity-10`}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8 border-2 border-dashed border-primary/30 backdrop-blur-xl bg-gradient-to-br from-primary/5 to-accent/5 mb-12 hover:border-primary/60 transition-all cursor-pointer hover:bg-primary/10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upload New Document</h3>
              <p className="text-muted-foreground mb-6">Drag and drop or click to select files (max 100 MB)</p>
              <button className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all">
                Browse Files
              </button>
            </div>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50"
                    : "border border-white/10 text-muted-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-6">
            <h2 className="text-2xl font-bold mb-8">Your Documents ({filteredDocs.length})</h2>

            <div className="space-y-3">
              {filteredDocs.map((doc) => (
                <div key={doc.id}>
                  <div
                    className="rounded-xl p-5 border border-white/10 backdrop-blur-lg bg-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group"
                    onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{doc.name}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <File className="w-3 h-3" />
                            {doc.size}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {doc.lastModified}
                          </span>
                          <span>v{doc.versions}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20">
                        <span className="text-xs font-semibold text-primary">{doc.category}</span>
                      </div>
                      {doc.status === "verified" ? (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-xs font-medium text-green-400">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20">
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs font-medium text-yellow-400">Pending</span>
                        </div>
                      )}
                      <button className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {expandedDoc === doc.id && (
                    <div className="mt-2 p-4 rounded-lg bg-white/5 border border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Uploaded By</p>
                          <p className="font-semibold text-white">{doc.uploadedBy}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Blockchain Hash</p>
                          <p className="font-mono text-xs text-primary truncate">{doc.hash}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors font-semibold">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors font-semibold">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-semibold">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
