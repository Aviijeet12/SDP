"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Play, BookOpen, Zap } from "lucide-react"

export default function LearningPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [simulationRunning, setSimulationRunning] = useState(false)

  const steps = [
    {
      title: "Transaction Initiation",
      description: "User initiates a transaction by calling a smart contract function",
      details: [
        "Transaction created with: from, to, value, data, gas, gasPrice",
        "Transaction signed with private key",
        "Sent to mempool",
      ],
    },
    {
      title: "Validation",
      description: "The network validates the transaction signature and nonce",
      details: ["Cryptographic signature verification", "Nonce sequence check", "Gas availability check"],
    },
    {
      title: "Mining/Validation",
      description: "Miners/validators include the transaction in a block",
      details: [
        "Transaction added to block",
        "Merkle tree construction",
        "Block header creation",
        "Proof of work/stake",
      ],
    },
    {
      title: "Execution",
      description: "Smart contract code is executed by the Ethereum Virtual Machine",
      details: ["Contract code loaded", "State changes recorded", "Gas consumed tracked"],
    },
    {
      title: "Confirmation",
      description: "Block is added to the blockchain and transaction is confirmed",
      details: ["Block consensus achieved", "State root updated", "Transaction finalized"],
    },
  ]

  const handleSimulation = () => {
    setSimulationRunning(true)
    let step = 0
    const interval = setInterval(() => {
      if (step < steps.length) {
        setCurrentStep(step)
        step++
      } else {
        setSimulationRunning(false)
        clearInterval(interval)
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 glass rounded-full">
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Interactive Learning
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blockchain <span className="gradient-text">Learning Sandbox</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand how transactions flow through the blockchain. Step through each stage with visual diagrams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Timeline */}
            <div className="md:col-span-1 glass-card">
              <h2 className="text-xl font-bold mb-6">Transaction Flow</h2>

              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      currentStep === idx ? "glass bg-white/20 border-l-4 border-primary" : "glass hover:bg-white/10"
                    }`}
                  >
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{step.description}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSimulation}
                disabled={simulationRunning}
                className="w-full mt-6 glass-button bg-gradient-to-r from-primary to-accent text-white disabled:opacity-50"
              >
                <Play className="w-4 h-4 inline mr-2" />
                {simulationRunning ? "Running..." : "Run Simulation"}
              </button>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 glass-card">
              <div className="mb-6">
                <div className="inline-block mb-3 px-3 py-1 glass rounded-full">
                  <span className="text-xs font-medium text-primary">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-2">{steps[currentStep].title}</h2>
                <p className="text-lg text-muted-foreground">{steps[currentStep].description}</p>
              </div>

              {/* Visualization */}
              <div className="bg-black/30 rounded-lg p-8 mb-6 border border-white/10 min-h-48 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                  <p className="text-muted-foreground">Visual representation of {steps[currentStep].title}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <p className="text-sm font-semibold mb-3">Key Details:</p>
                {steps[currentStep].details.map((detail, idx) => (
                  <div key={idx} className="glass rounded-lg p-3 text-sm text-muted-foreground">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3 align-middle" />
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Concepts */}
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-6">Key Concepts</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Smart Contracts",
                  desc: "Self-executing code on the blockchain with predefined rules",
                },
                { title: "Gas", desc: "Computational cost of executing transactions and contracts" },
                { title: "State Changes", desc: "Modifications to data stored on the blockchain" },
                { title: "Consensus", desc: "Agreement mechanism ensuring all nodes have same state" },
              ].map((concept, idx) => (
                <div key={idx} className="glass rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{concept.title}</h3>
                  <p className="text-sm text-muted-foreground">{concept.desc}</p>
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
