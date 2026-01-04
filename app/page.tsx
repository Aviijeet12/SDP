"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Lock, Zap, Layers, FileCheck, Search, BookOpen } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 smooth-fade">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <span className="text-sm font-medium text-primary">Enterprise Blockchain Solution</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Trust
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Automation
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Enterprise-grade blockchain platform for smart contracts, digital trust, and secure automation. Build,
              verify, and deploy with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard/auth"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary via-accent to-primary text-white font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 inline-flex items-center justify-center"
              >
                Access Portal
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/contracts/generate"
                className="px-6 py-3 rounded-lg bg-card border border-border text-foreground font-medium transition-all duration-300 hover:border-primary hover:shadow-lg inline-flex items-center justify-center"
              >
                Try Generator
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "AI-Powered Generation",
                desc: "Generate Solidity contracts with natural language",
                href: "/contracts/generate",
              },
              {
                icon: Lock,
                title: "Security Scanner",
                desc: "Detect vulnerabilities and risks automatically",
                href: "/security",
              },
              {
                icon: FileCheck,
                title: "Document Verification",
                desc: "Verify document authenticity instantly",
                href: "/verify",
              },
            ].map((card, idx) => (
              <Link
                key={idx}
                href={card.href}
                onMouseEnter={() => setHoveredCard(`hero-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 group cursor-pointer"
              >
                <div className="mb-4 p-3 bg-gradient-to-br from-primary via-accent to-primary rounded-lg w-fit">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Comprehensive Platform</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Smart Contracts",
                items: ["LLM Generator", "Template Marketplace", "Security Analysis"],
                icon: Layers,
              },
              {
                title: "Document Control",
                items: ["Authenticity Verification", "Provenance Tracking", "Version History"],
                icon: FileCheck,
              },
              {
                title: "Access & Sharing",
                items: ["Permissions Management", "Cross-border Payments", "Secure Sharing"],
                icon: Lock,
              },
              {
                title: "Learning Center",
                items: ["Interactive Sandbox", "Transaction Simulator", "Blockchain Education"],
                icon: BookOpen,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary via-accent to-primary rounded-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <ul className="space-y-2">
                      {feature.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tools Grid */}
      <section className="py-24 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Quick Tools</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Generate Contract", icon: Zap, href: "/contracts/generate", color: "from-primary" },
              { title: "Browse Templates", icon: Layers, href: "/templates", color: "from-accent" },
              { title: "Security Check", icon: Lock, href: "/security", color: "from-primary" },
              { title: "Learn Blockchain", icon: BookOpen, href: "/sandbox", color: "from-accent" },
              { title: "Verify Document", icon: FileCheck, href: "/verify", color: "from-primary" },
              { title: "Explore Contracts", icon: Search, href: "/explorer", color: "from-accent" },
            ].map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 bg-gradient-to-br ${tool.color} to-transparent group`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <tool.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white">{tool.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
