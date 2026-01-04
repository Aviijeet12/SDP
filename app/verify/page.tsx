"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

export default function VerifyPage() {
  const [document, setDocument] = useState<File | null>(null)
  const [documentId, setDocumentId] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDocument(file)
    }
  }

  const handleVerify = () => {
    if (!document && !documentId) return
    setVerifying(true)

    setTimeout(() => {
      setResult({
        status: "authentic",
        hash: "0x7f3d9c2e1a5b4f6e8d3c1a9b2f7e5c4d3a1b9f2e",
        uploadedDate: "2025-01-15T10:30:00Z",
        lastModified: "2025-01-15T10:30:00Z",
        verified: true,
        chain: "Ethereum Mainnet",
        blockNumber: 21456789,
        txHash: "0x9e4f1a3c5b7d2f8e1c6a4b9d3f2e7c1a5b8d4f6e",
      })
      setVerifying(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50">
              <span className="text-sm font-medium text-primary">Document Authentication</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Document <span className="gradient-text">Authenticity Verifier</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Verify document authenticity instantly. Check for tampering, view blockchain history, and confirm
              provenance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Upload Section */}
            <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Verify Document</h2>

              <div className="space-y-6">
                <div className="rounded-lg p-6 border-2 border-dashed border-primary/50 bg-white/5 text-center cursor-pointer hover:border-primary hover:bg-white/10 transition-all">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.json"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <p className="font-semibold mb-1">
                      {document ? document.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground">PDF, Word, TXT, JSON up to 10MB</p>
                  </label>
                </div>

                {/* Or Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-sm text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Document ID</label>
                  <input
                    type="text"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    placeholder="0x7f3d9c2e1a5b4f6e8d3c1a9b2f7e5c4d3a1b9f2e"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 border-primary/40 font-mono text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerify}
                  disabled={verifying || (!document && !documentId)}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all font-medium"
                >
                  {verifying ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Document"
                  )}
                </button>
              </div>
            </div>

            {/* Result Section */}
            <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Verification Result</h2>

              {result ? (
                <div className="space-y-4">
                  {/* Status Card */}
                  <div
                    className={`rounded-lg p-6 border-2 backdrop-blur-lg bg-white/5 ${result.verified ? "border-green-500/50" : "border-red-500/50"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {result.verified ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      )}
                      <h3 className="text-2xl font-bold">{result.verified ? "Authentic" : "Tampered"}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.verified
                        ? "Document integrity verified on blockchain"
                        : "Document has been modified since upload"}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="rounded-lg p-4 bg-white/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Document Hash</p>
                      <p className="font-mono text-sm break-all text-primary">{result.hash}</p>
                    </div>

                    <div className="rounded-lg p-4 bg-white/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Uploaded</p>
                      <p className="text-sm">{new Date(result.uploadedDate).toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg p-4 bg-white/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Blockchain</p>
                      <p className="text-sm">
                        {result.chain} • Block #{result.blockNumber}
                      </p>
                    </div>

                    <div className="rounded-lg p-4 bg-white/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Transaction</p>
                      <p className="font-mono text-xs break-all text-primary">{result.txHash}</p>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-lg bg-white/10 border border-primary/30 hover:bg-white/20 transition-colors font-medium">
                    Download Report
                  </button>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Verification results will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">How Document Verification Works</h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: "1", title: "Hash Generation", desc: "Document converted to unique hash using SHA-256" },
                { num: "2", title: "Blockchain Record", desc: "Hash stored in smart contract on blockchain" },
                {
                  num: "3",
                  title: "Immutable Proof",
                  desc: "Timestamp and block number recorded permanently",
                },
                {
                  num: "4",
                  title: "Verification",
                  desc: "Hash compared with blockchain record for authenticity",
                },
              ].map((step, idx) => (
                <div key={idx}>
                  <div className="rounded-lg p-4 text-center mb-4 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                    <p className="text-3xl font-bold text-primary">{step.num}</p>
                  </div>
                  <h3 className="font-semibold text-center mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
