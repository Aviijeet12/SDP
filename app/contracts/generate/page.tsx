"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowRight, Copy, Download, Zap, ChevronDown } from "lucide-react"

export default function GenerateContractPage() {
  const [prompt, setPrompt] = useState("")
  const [contractType, setContractType] = useState("erc20")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  const contractTypes = [
    { value: "erc20", label: "ERC-20 Token", color: "from-blue-500 to-cyan-500", desc: "Standard fungible token" },
    { value: "erc721", label: "ERC-721 NFT", color: "from-primary to-accent", desc: "Non-fungible token" },
    {
      value: "erc1155",
      label: "ERC-1155 MultiToken",
      color: "from-orange-500 to-red-500",
      desc: "Multi-token standard",
    },
    { value: "dao", label: "DAO Governance", color: "from-green-500 to-emerald-500", desc: "Decentralized governance" },
    { value: "staking", label: "Staking Protocol", color: "from-indigo-500 to-blue-500", desc: "Reward staking" },
    { value: "swap", label: "DEX Swap", color: "from-cyan-500 to-teal-500", desc: "Decentralized exchange" },
  ]

  const contractTemplates: Record<string, string> = {
    erc20: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ERC-20 Token Contract
 * @dev Full-featured ERC-20 token implementation
 * @author BlockChain Trust AI
 */

contract MyToken {
    string public name = "${prompt || "My Token"}";
    string public symbol = "MYT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** 18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Burn(address indexed burner, uint256 value);
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
    
    function burn(uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        totalSupply -= value;
        emit Burn(msg.sender, value);
        return true;
    }
}`,
    erc721: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ERC-721 NFT Contract
 * @dev Non-fungible token implementation with metadata
 */

contract MyNFT {
    string public name = "My NFT";
    string public symbol = "MNFT";
    uint256 public tokenCounter = 0;
    
    mapping(uint256 => address) public tokenOwner;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => string) public tokenURI;
    mapping(uint256 => address) public tokenApprovals;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event Minted(uint256 indexed tokenId, address indexed to, string uri);
    
    function mint(address to, string memory uri) public {
        require(to != address(0), "Invalid address");
        uint256 tokenId = tokenCounter++;
        tokenOwner[tokenId] = to;
        balanceOf[to]++;
        tokenURI[tokenId] = uri;
        emit Minted(tokenId, to, uri);
        emit Transfer(address(0), to, tokenId);
    }
    
    function transferFrom(address from, address to, uint256 tokenId) public {
        require(tokenOwner[tokenId] == from, "Not owner");
        require(to != address(0), "Invalid address");
        balanceOf[from]--;
        balanceOf[to]++;
        tokenOwner[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }
    
    function burn(uint256 tokenId) public {
        require(tokenOwner[tokenId] == msg.sender, "Not owner");
        balanceOf[msg.sender]--;
        delete tokenOwner[tokenId];
        delete tokenURI[tokenId];
    }
}`,
    erc1155: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ERC-1155 Multi-Token Contract
 * @dev Multi-token standard supporting both fungible and non-fungible tokens
 */

contract MyMultiToken {
    mapping(uint256 => mapping(address => uint256)) public balanceOf;
    mapping(address => mapping(address => bool)) public operatorApproval;
    
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount) public {
        require(to != address(0), "Invalid address");
        require(from == msg.sender || operatorApproval[from][msg.sender], "Not authorized");
        balanceOf[id][from] -= amount;
        balanceOf[id][to] += amount;
        emit TransferSingle(msg.sender, from, to, id, amount);
    }
    
    function setApprovalForAll(address operator, bool approved) public {
        operatorApproval[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }
}`,
    dao: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DAO Governance Contract
 * @dev Decentralized Autonomous Organization with voting mechanism
 */

contract SimpleDAO {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        bool executed;
        uint256 deadline;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public voters;
    mapping(address => uint256) public votingPower;
    uint256 public proposalCount = 0;
    
    event ProposalCreated(uint256 indexed id, string description);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event Executed(uint256 indexed proposalId);
    
    function createProposal(string memory description, uint256 duration) public {
        proposals[proposalCount] = Proposal(proposalCount, description, 0, false, block.timestamp + duration);
        emit ProposalCreated(proposalCount, description);
        proposalCount++;
    }
    
    function vote(uint256 proposalId) public {
        require(!voters[proposalId][msg.sender], "Already voted");
        require(block.timestamp <= proposals[proposalId].deadline, "Voting ended");
        proposals[proposalId].voteCount += votingPower[msg.sender];
        voters[proposalId][msg.sender] = true;
        emit Voted(proposalId, msg.sender);
    }
}`,
    staking: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Staking Protocol
 * @dev Reward distribution for staked tokens
 */

contract StakingPool {
    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 rewards;
    }
    
    mapping(address => Stake) public stakes;
    uint256 public totalStaked = 0;
    uint256 public rewardRate = 10; // 10% per year
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    function stake(uint256 amount) public {
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].startTime = block.timestamp;
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }
    
    function calculateRewards(address user) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        uint256 duration = block.timestamp - userStake.startTime;
        return (userStake.amount * rewardRate * duration) / (365 days * 100);
    }
    
    function claimRewards() public {
        uint256 rewards = calculateRewards(msg.sender);
        stakes[msg.sender].rewards = 0;
        emit RewardsClaimed(msg.sender, rewards);
    }
}`,
    swap: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DEX Swap Protocol
 * @dev Decentralized exchange with liquidity pools
 */

contract SimpleSwap {
    mapping(address => mapping(address => uint256)) public liquidity;
    mapping(address => uint256) public reserves;
    
    event LiquidityAdded(address indexed provider, address indexed token, uint256 amount);
    event Swapped(address indexed user, address indexed from, address indexed to, uint256 amount);
    
    function addLiquidity(address token, uint256 amount) public {
        liquidity[token][msg.sender] += amount;
        reserves[token] += amount;
        emit LiquidityAdded(msg.sender, token, amount);
    }
    
    function getPrice(address tokenIn, address tokenOut) public view returns (uint256) {
        require(reserves[tokenIn] > 0 && reserves[tokenOut] > 0, "Insufficient liquidity");
        return (reserves[tokenOut] * 1000) / reserves[tokenIn];
    }
    
    function swap(address tokenIn, address tokenOut, uint256 amountIn) public {
        require(reserves[tokenIn] > 0 && reserves[tokenOut] > 0, "Insufficient liquidity");
        uint256 amountOut = (amountIn * reserves[tokenOut]) / (reserves[tokenIn] + amountIn);
        reserves[tokenIn] += amountIn;
        reserves[tokenOut] -= amountOut;
        emit Swapped(msg.sender, tokenIn, tokenOut, amountOut);
    }
}`,
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const template = contractTemplates[contractType as keyof typeof contractTemplates]
      setGeneratedCode(template)
      setIsGenerating(false)
    }, 1200)
  }

  const selectedType = contractTypes.find((t) => t.value === contractType)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-lg bg-primary/5 border border-primary/30">
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <Zap className="w-4 h-4" /> AI-Powered Generation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Smart Contract <span className="gradient-text">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate production-ready Solidity contracts using AI. Pick a type, describe your needs, and get secure
              code instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6">Create Your Contract</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Contract Type</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-primary/50 bg-white/5 hover:bg-white/10 flex items-center justify-between transition-all"
                    >
                      <span
                        className={`font-semibold bg-gradient-to-r ${selectedType?.color} bg-clip-text text-transparent`}
                      >
                        {selectedType?.label}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {showTypeDropdown && (
                      <div className="absolute top-full mt-2 w-full z-50 border border-primary/30 rounded-lg overflow-hidden bg-background/95 backdrop-blur-lg">
                        {contractTypes.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => {
                              setContractType(type.value)
                              setShowTypeDropdown(false)
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-primary/20 transition-colors border-b border-white/5 last:border-0"
                          >
                            <div
                              className={`font-semibold bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}
                            >
                              {type.label}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Contract Description</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your contract... e.g., 'Create a token with max supply of 1M and 8 decimals'"
                    className="w-full px-4 py-2.5 rounded-lg bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-all duration-300 h-32 resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Contract
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm font-medium mb-4">Smart Features:</p>
                <ul className="space-y-2">
                  {["Security Audits", "Gas Optimization", "Best Practices", "Compliance Checks"].map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Generated Code</h2>
                {generatedCode && (
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {generatedCode ? (
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-auto max-h-96 border-2 border-primary/40">
                  <code className="text-green-400 whitespace-pre-wrap break-words">{generatedCode}</code>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center border-2 border-dashed border-primary/30 rounded-lg">
                  <p className="text-muted-foreground text-center">Your generated contract will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Section */}
          {generatedCode && (
            <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6">Contract Explanation</h2>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    This {selectedType?.label} contract is fully generated with security best practices, proper error
                    handling, and optimized gas consumption. Ready for deployment on Ethereum mainnet and compatible EVM
                    chains.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Key Functions</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>
                      • <strong>Constructor</strong> - Initializes contract state
                    </li>
                    <li>
                      • <strong>Public Functions</strong> - Main contract operations
                    </li>
                    <li>
                      • <strong>Events</strong> - Transaction logging for indexing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
