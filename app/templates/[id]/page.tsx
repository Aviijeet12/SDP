"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Copy, Download, Star, Eye, Code } from "lucide-react"

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const templateData = {
    id: params.id,
    title: "ERC-20 Token Template",
    description: "A comprehensive ERC-20 token implementation following best practices",
    rating: 4.8,
    uses: 1240,
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "My Token";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** 18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        return true;
    }
}`,
  }

  const parameters = [
    { name: "Token Name", value: "My Token", type: "string" },
    { name: "Symbol", value: "MTK", type: "string" },
    { name: "Total Supply", value: "1000000", type: "uint256" },
    { name: "Decimals", value: "18", type: "uint8" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block mb-4 px-4 py-2 glass rounded-full">
              <span className="text-sm font-medium text-primary">Template Details</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{templateData.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{templateData.description}</p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold">{templateData.rating}/5.0</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Uses</p>
                  <p className="font-semibold">{templateData.uses}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Parameters */}
            <div className="md:col-span-1">
              <div className="glass-card">
                <h2 className="text-xl font-bold mb-6">Customizable Parameters</h2>
                <div className="space-y-4">
                  {parameters.map((param, idx) => (
                    <div key={idx} className="glass rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">{param.name}</p>
                      <input
                        type="text"
                        defaultValue={param.value}
                        className="glass-input w-full text-sm"
                        placeholder={param.name}
                      />
                      <p className="text-xs text-muted-foreground mt-2">{param.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="md:col-span-2">
              <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Contract Code
                  </h2>
                  <div className="flex gap-2">
                    <button className="p-2 glass rounded-lg hover:bg-white/20 transition-all">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 glass rounded-lg hover:bg-white/20 transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm overflow-auto max-h-96 border border-white/5">
                  <code className="text-green-400 whitespace-pre-wrap break-words">{templateData.code}</code>
                </div>

                <button className="w-full mt-6 glass-button bg-gradient-to-r from-primary to-accent text-white">
                  Use This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
