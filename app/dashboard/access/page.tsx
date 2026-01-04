"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import { Share2, Lock, Trash2, Plus, ChevronDown, Users } from "lucide-react"

export default function AccessPage() {
  const [selectedDoc, setSelectedDoc] = useState("Q1_Reports")
  const [shareEmail, setShareEmail] = useState("")
  const [sharePermission, setSharePermission] = useState("view")
  const [isSharing, setIsSharing] = useState(false)
  const [showDocDropdown, setShowDocDropdown] = useState(false)
  const [showPermissionDropdown, setShowPermissionDropdown] = useState(false)

  const [sharedDocuments, setSharedDocuments] = useState([
    {
      id: 1,
      name: "Q1_Reports",
      sharedWith: "sarah@company.com",
      permission: "view",
      sharedDate: "2025-01-10",
    },
    {
      id: 2,
      name: "Legal_Agreement_2025.pdf",
      sharedWith: "john@company.com",
      permission: "edit",
      sharedDate: "2025-01-12",
    },
    {
      id: 3,
      name: "Contract_Draft.docx",
      sharedWith: "team@company.com",
      permission: "view",
      sharedDate: "2025-01-08",
    },
  ])

  const documents = ["Q1_Reports", "Legal_Agreement_2025.pdf", "Contract_Draft.docx", "Financial_Audit.xlsx"]

  const permissionOptions = [
    { value: "view", label: "View Only", color: "bg-blue-500/20 text-blue-400" },
    { value: "edit", label: "Edit", color: "bg-orange-500/20 text-orange-400" },
    { value: "admin", label: "Admin", color: "bg-red-500/20 text-red-400" },
  ]

  const handleShare = () => {
    if (!selectedDoc || !shareEmail) return
    setIsSharing(true)
    setTimeout(() => {
      const newShare = {
        id: sharedDocuments.length + 1,
        name: selectedDoc,
        sharedWith: shareEmail,
        permission: sharePermission,
        sharedDate: new Date().toISOString().split("T")[0],
      }
      setSharedDocuments([...sharedDocuments, newShare])
      setIsSharing(false)
      setShareEmail("")
      setSharePermission("view")
    }, 1500)
  }

  const handleDelete = (id: number) => {
    setSharedDocuments(sharedDocuments.filter((doc) => doc.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/20 border border-primary/40">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Access Control & Sharing</h1>
            </div>
            <p className="text-muted-foreground text-lg ml-12">
              Manage document permissions and secure sharing with granular controls
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Plus className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Share New Document</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowDocDropdown(!showDocDropdown)}
                  className="w-full px-4 py-2.5 rounded-lg bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-all duration-300 flex items-center justify-between"
                >
                  <span className="text-foreground">{selectedDoc || "Select document..."}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform ${showDocDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showDocDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-primary rounded-lg shadow-lg z-10">
                    {documents.map((doc) => (
                      <button
                        key={doc}
                        onClick={() => {
                          setSelectedDoc(doc)
                          setShowDocDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2.5 text-foreground hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-border last:border-b-0"
                      >
                        {doc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Email input */}
              <input
                type="email"
                placeholder="Enter email address..."
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-all duration-300"
              />

              <div className="relative">
                <button
                  onClick={() => setShowPermissionDropdown(!showPermissionDropdown)}
                  className="w-full px-4 py-2.5 rounded-lg bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-all duration-300 flex items-center justify-between"
                >
                  <span className="text-foreground">
                    {permissionOptions.find((p) => p.value === sharePermission)?.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform ${showPermissionDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showPermissionDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-primary rounded-lg shadow-lg z-10">
                    {permissionOptions.map((perm) => (
                      <button
                        key={perm.value}
                        onClick={() => {
                          setSharePermission(perm.value)
                          setShowPermissionDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2.5 text-foreground hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-border last:border-b-0"
                      >
                        {perm.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                disabled={isSharing || !selectedDoc || !shareEmail}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                {isSharing ? "Sharing..." : "Share"}
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-primary/20 border border-primary/40">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Active Shares ({sharedDocuments.length})</h2>
            </div>

            <div className="space-y-3">
              {sharedDocuments.map((share) => (
                <div
                  key={share.id}
                  className="bg-card border border-border rounded-lg p-4 flex items-center justify-between group hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors">
                      <Lock className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg text-foreground truncate">{share.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Shared with <span className="text-primary font-medium">{share.sharedWith}</span> on{" "}
                        <span className="text-foreground">{share.sharedDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-4">
                    <span
                      className={`text-sm px-4 py-2 rounded-full font-semibold border ${
                        share.permission === "view"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : share.permission === "edit"
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {share.permission === "view" ? "View" : share.permission === "edit" ? "Edit" : "Admin"}
                    </span>
                    <button
                      onClick={() => handleDelete(share.id)}
                      className="p-3 rounded-lg bg-destructive/20 border border-destructive/30 hover:bg-destructive/30 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {sharedDocuments.length === 0 && (
              <div className="text-center py-12">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No shared documents yet. Start sharing to collaborate!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
