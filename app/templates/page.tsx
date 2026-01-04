"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Search, Star, Users } from "lucide-react"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "tokens", "nft", "governance", "defi", "staking", "security", "utility"]

  const templates = [
    {
      id: "erc20-basic",
      title: "ERC-20 Token",
      description: "Standard ERC-20 token implementation with transfer and approval",
      category: "tokens",
      rating: 4.8,
      uses: 1240,
      tags: ["Token", "ERC-20", "Beginner"],
      icon: "💰",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyToken {
    string public name = "My Token";
    string public symbol = "MYT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** 18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}`,
    },
    {
      id: "erc721-nft",
      title: "ERC-721 NFT",
      description: "Full-featured NFT contract with minting and metadata",
      category: "nft",
      rating: 4.9,
      uses: 892,
      tags: ["NFT", "ERC-721", "Intermediate"],
      icon: "🎨",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyNFT {
    string public name = "My NFT";
    uint256 public tokenCounter = 0;
    
    mapping(uint256 => address) public tokenOwner;
    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 tokenId);
    
    function mint(address to) public {
        uint256 tokenId = tokenCounter++;
        tokenOwner[tokenId] = to;
        balanceOf[to]++;
        emit Transfer(address(0), to, tokenId);
    }
}`,
    },
    {
      id: "dao-governance",
      title: "DAO Governance",
      description: "Decentralized autonomous organization with voting",
      category: "governance",
      rating: 4.7,
      uses: 567,
      tags: ["DAO", "Governance", "Advanced"],
      icon: "🏛️",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDAO {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        bool executed;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public voters;
    uint256 public proposalCount = 0;
    
    event ProposalCreated(uint256 indexed id, string description);
    
    function createProposal(string memory description) public {
        proposals[proposalCount] = Proposal(proposalCount, description, 0, false);
        emit ProposalCreated(proposalCount, description);
        proposalCount++;
    }
}`,
    },
    {
      id: "staking-pool",
      title: "Staking Pool",
      description: "Reward distribution and staking mechanism",
      category: "staking",
      rating: 4.6,
      uses: 734,
      tags: ["Staking", "Rewards", "Advanced"],
      icon: "📈",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StakingPool {
    mapping(address => uint256) public stakes;
    uint256 public totalStaked = 0;
    uint256 public rewardRate = 10;
    
    event Staked(address indexed user, uint256 amount);
    
    function stake(uint256 amount) public {
        stakes[msg.sender] += amount;
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }
}`,
    },
    {
      id: "uniswap-fork",
      title: "DEX Swap",
      description: "Decentralized exchange contract with liquidity pools",
      category: "defi",
      rating: 4.5,
      uses: 912,
      tags: ["DEX", "DeFi", "Advanced"],
      icon: "🔄",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleSwap {
    mapping(address => uint256) public reserves;
    
    function getPrice(address tokenIn, address tokenOut) public view returns (uint256) {
        return (reserves[tokenOut] * 1000) / reserves[tokenIn];
    }
}`,
    },
    {
      id: "multi-sig",
      title: "Multi-Signature Wallet",
      description: "Secure wallet requiring multiple approvals",
      category: "security",
      rating: 4.9,
      uses: 645,
      tags: ["Wallet", "Security", "Advanced"],
      icon: "🔐",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiSigWallet {
    address[] public owners;
    uint256 public required;
    
    mapping(uint256 => mapping(address => bool)) public confirmations;
    
    event SubmitTransaction(address indexed owner, uint256 txIndex);
}`,
    },
    {
      id: "erc1155",
      title: "ERC-1155 MultiToken",
      description: "Multi-token standard supporting fungible & non-fungible",
      category: "tokens",
      rating: 4.7,
      uses: 456,
      tags: ["MultiToken", "ERC-1155"],
      icon: "🎯",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyMultiToken {
    mapping(uint256 => mapping(address => uint256)) public balanceOf;
    
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
}`,
    },
    {
      id: "erc721-enumerable",
      title: "Enumerable NFT",
      description: "NFT with enumeration and batch operations",
      category: "nft",
      rating: 4.8,
      uses: 678,
      tags: ["NFT", "Enumerable"],
      icon: "🖼️",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EnumerableNFT {
    uint256[] public allTokens;
    mapping(uint256 => uint256) public tokenIndexes;
}`,
    },
    {
      id: "voting-token",
      title: "Governance Token",
      description: "ERC-20 token with voting power and delegation",
      category: "governance",
      rating: 4.8,
      uses: 534,
      tags: ["Token", "Voting"],
      icon: "🗳️",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GovernanceToken {
    mapping(address => uint256) public votes;
    mapping(address => address) public delegates;
}`,
    },
    {
      id: "flash-loan",
      title: "Flash Loan Protocol",
      description: "Uncollateralized lending with callback verification",
      category: "defi",
      rating: 4.6,
      uses: 389,
      tags: ["DeFi", "Lending"],
      icon: "⚡",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FlashLoan {
    function flashLoan(uint256 amount) public {
        require(amount <= totalLiquidity, "Insufficient liquidity");
    }
}`,
    },
    {
      id: "liquidity-pool",
      title: "Liquidity Pool",
      description: "Automated market maker with constant product formula",
      category: "defi",
      rating: 4.7,
      uses: 823,
      tags: ["AMM", "DeFi"],
      icon: "💧",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LiquidityPool {
    uint256 public reserve0;
    uint256 public reserve1;
    
    function getAmountOut(uint256 amountIn) public view returns (uint256) {
        return (amountIn * reserve1) / (reserve0 + amountIn);
    }
}`,
    },
    {
      id: "nft-marketplace",
      title: "NFT Marketplace",
      description: "Buy, sell, and auction NFTs with royalties",
      category: "nft",
      rating: 4.8,
      uses: 956,
      tags: ["NFT", "Marketplace"],
      icon: "🏪",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    
    mapping(uint256 => Listing) public listings;
}`,
    },
    {
      id: "yield-farm",
      title: "Yield Farm",
      description: "Liquidity provider rewards and farm token emissions",
      category: "staking",
      rating: 4.7,
      uses: 712,
      tags: ["Farming", "Rewards"],
      icon: "🌾",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract YieldFarm {
    mapping(address => uint256) public lpTokens;
    uint256 public emissionRate;
}`,
    },
    {
      id: "token-locker",
      title: "Token Locker",
      description: "Time-locked token release for vesting schedules",
      category: "utility",
      rating: 4.6,
      uses: 445,
      tags: ["Vesting", "Timelock"],
      icon: "🔒",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TokenLocker {
    struct Lock {
        uint256 amount;
        uint256 releaseTime;
    }
    
    mapping(address => Lock) public locks;
}`,
    },
    {
      id: "bond-protocol",
      title: "Bond Protocol",
      description: "Protocol for selling bonds at discount for liquidity",
      category: "defi",
      rating: 4.5,
      uses: 334,
      tags: ["Bonds", "DeFi"],
      icon: "📜",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BondProtocol {
    mapping(address => uint256) public bondBalance;
}`,
    },
    {
      id: "nft-staking",
      title: "NFT Staking",
      description: "Stake NFTs to earn rewards over time",
      category: "staking",
      rating: 4.7,
      uses: 567,
      tags: ["NFT", "Staking"],
      icon: "🎁",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NFTStaking {
    mapping(uint256 => address) public stakedBy;
    mapping(uint256 => uint256) public stakeTime;
}`,
    },
    {
      id: "oracle-contract",
      title: "Price Oracle",
      description: "Decentralized price feed for assets",
      category: "utility",
      rating: 4.6,
      uses: 478,
      tags: ["Oracle", "Utility"],
      icon: "📊",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PriceOracle {
    mapping(address => uint256) public prices;
    uint256 public lastUpdate;
}`,
    },
    {
      id: "escrow-contract",
      title: "Escrow Service",
      description: "Secure third-party transaction settlement",
      category: "security",
      rating: 4.8,
      uses: 612,
      tags: ["Escrow", "Security"],
      icon: "🛡️",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    struct Deal {
        address buyer;
        address seller;
        uint256 amount;
        bool completed;
    }
    
    mapping(uint256 => Deal) public deals;
}`,
    },
    {
      id: "batch-transfer",
      title: "Batch Transfer Utility",
      description: "Transfer tokens to multiple addresses in one tx",
      category: "utility",
      rating: 4.5,
      uses: 389,
      tags: ["Utility", "Batch"],
      icon: "📦",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BatchTransfer {
    function batchTransfer(address[] memory recipients, uint256[] memory amounts) public {
        require(recipients.length == amounts.length);
    }
}`,
    },
  ]

  const filtered = templates.filter(
    (t) =>
      (selectedCategory === "all" || t.category === selectedCategory) &&
      t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50">
              <span className="text-sm font-medium text-primary">Template Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Smart Contract <span className="gradient-text">Templates</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore 20+ production-ready smart contract templates designed by experts. Complete with code and best
              practices.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="backdrop-blur-lg bg-white/5 border border-primary/30 rounded-lg mb-12 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-primary/20 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                        : "bg-white/5 border border-primary/20 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <Link
                key={template.id}
                href={`/templates/${template.id}`}
                className="group backdrop-blur-lg bg-white/5 border border-primary/20 hover:border-primary/60 rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/10"
              >
                <div className="mb-4 text-4xl">{template.icon}</div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                <div className="flex items-center gap-4 mb-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{template.uses}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No templates found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
