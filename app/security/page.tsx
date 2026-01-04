"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Upload, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"

export default function SecurityCheckerPage() {
  const [code, setCode] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResults({
        issues: [
          {
            level: "critical",
            title: "Reentrancy Vulnerability",
            description: "External call made before state update. Use checks-effects-interactions pattern.",
            line: 42,
          },
          {
            level: "high",
            title: "Integer Overflow/Underflow",
            description: "Consider using SafeMath library or Solidity ^0.8.0 for automatic checks.",
            line: 67,
          },
          {
            level: "medium",
            title: "Missing Input Validation",
            description: "Function parameter should validate against zero address.",
            line: 89,
          },
          {
            level: "low",
            title: "Gas Optimization",
            description: "Consider using storage-efficient packing for state variables.",
            line: 15,
          },
        ],
        score: 72,
        gasUsage: 2450000,
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const riskColor: Record<string, { bg: string; text: string; border: string }> = {
    critical: { bg: "bg-red-500", text: "text-red-400", border: "border-red-500" },
    high: { bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500" },
    medium: { bg: "bg-yellow-500", text: "text-yellow-400", border: "border-yellow-500" },
    low: { bg: "bg-blue-500", text: "text-blue-400", border: "border-blue-500" },
  }

  const riskIcon = {
    critical: AlertCircle,
    high: AlertTriangle,
    medium: AlertTriangle,
    low: CheckCircle,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <span className="text-sm font-medium text-primary">Security Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Smart Contract{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Security Checker
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Automated security scanning for smart contracts. Detect vulnerabilities, gas inefficiencies, and
              compliance issues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Input */}
            <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-8">
              <h2 className="text-2xl font-bold mb-6">Paste Your Code</h2>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your Solidity contract code here..."
                className="w-full h-48 resize-none font-mono text-sm mb-6 rounded-lg border-2 border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />

              <div className="space-y-3">
                <button className="w-full rounded-lg p-4 text-center border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer bg-white/5">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Or upload a file</p>
                </button>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !code}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary via-accent to-primary text-white font-bold disabled:opacity-50 hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Contract"
                  )}
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-8">
              <h2 className="text-2xl font-bold mb-6">Security Report</h2>

              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Security Score</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        {results.score}%
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Gas Usage</p>
                      <p className="text-lg font-bold">{(results.gasUsage / 1000000).toFixed(2)}M</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium mb-2">Issues Found: {results.issues.length}</p>
                    <div className="space-y-1">
                      {results.issues.map((issue: any) => (
                        <div key={issue.title} className="flex items-center gap-2 text-sm">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: {
                                critical: "#f87171",
                                high: "#fb923c",
                                medium: "#facc15",
                                low: "#60a5fa",
                              }[issue.level],
                            }}
                          />
                          <span className="capitalize">{issue.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 rounded-lg border border-white/10 text-muted-foreground hover:border-primary/30 hover:shadow-lg transition-all">
                    Generate Detailed Report
                  </button>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Your analysis results will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Issues List */}
          {results && (
            <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-8">
              <h2 className="text-2xl font-bold mb-6">Detailed Findings</h2>

              <div className="space-y-4">
                {results.issues.map((issue: any, idx: number) => {
                  const Icon = riskIcon[issue.level]
                  const colorObj = riskColor[issue.level]
                  return (
                    <div
                      key={idx}
                      className="rounded-lg p-6 border-l-4 transition-all hover:shadow-lg border border-white/10 bg-white/5"
                      style={{
                        borderLeftColor: {
                          critical: "#f87171",
                          high: "#fb923c",
                          medium: "#facc15",
                          low: "#60a5fa",
                        }[issue.level],
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${colorObj.text}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{issue.title}</h3>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded text-white`}
                              style={{
                                backgroundColor: {
                                  critical: "#dc2626",
                                  high: "#ea580c",
                                  medium: "#ca8a04",
                                  low: "#2563eb",
                                }[issue.level],
                              }}
                            >
                              {issue.level.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                          <p className="text-xs text-primary/80">Line {issue.line}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
