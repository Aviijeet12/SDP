import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

const CONTRACT_TEMPLATES: Record<string, string> = {
  erc20: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract {TOKEN_NAME} {
    string public name = "{TOKEN_NAME}";
    string public symbol = "{SYMBOL}";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals;
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
}`,
  erc721: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract {NFT_NAME} {
    string public name = "{NFT_NAME}";
    string public symbol = "{SYMBOL}";
    uint256 public tokenCounter = 0;
    
    mapping(uint256 => address) public tokenOwner;
    mapping(uint256 => string) public tokenURI;
    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    
    function mint(address to, string memory uri) public {
        uint256 tokenId = tokenCounter;
        tokenOwner[tokenId] = to;
        tokenURI[tokenId] = uri;
        balanceOf[to]++;
        tokenCounter++;
        emit Transfer(address(0), to, tokenId);
    }
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        return tokenOwner[tokenId];
    }
}`,
  dao: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract {DAO_NAME} {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        uint256 deadline;
        bool executed;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount = 0;
    
    event ProposalCreated(uint256 indexed id, string description, uint256 deadline);
    event Voted(uint256 indexed proposalId, address indexed voter);
    
    function createProposal(string memory description, uint256 votingPeriod) public {
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: description,
            voteCount: 0,
            deadline: block.timestamp + votingPeriod,
            executed: false
        });
        emit ProposalCreated(proposalCount, description, block.timestamp + votingPeriod);
        proposalCount++;
    }
    
    function vote(uint256 proposalId) public {
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        require(block.timestamp < proposals[proposalId].deadline, "Voting ended");
        
        proposals[proposalId].voteCount++;
        hasVoted[proposalId][msg.sender] = true;
        emit Voted(proposalId, msg.sender);
    }
}`
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, contractType } = await request.json()

    if (!prompt || !contractType) {
      return NextResponse.json(
        { error: 'Prompt and contract type are required' },
        { status: 400 }
      )
    }

    // If OpenAI key is not set, use templates
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      const template = CONTRACT_TEMPLATES[contractType] || CONTRACT_TEMPLATES.erc20
      const generatedCode = template
        .replace(/{TOKEN_NAME}/g, prompt || 'MyToken')
        .replace(/{NFT_NAME}/g, prompt || 'MyNFT')
        .replace(/{DAO_NAME}/g, prompt || 'MyDAO')
        .replace(/{SYMBOL}/g, (prompt || 'TOKEN').substring(0, 5).toUpperCase())

      return NextResponse.json({
        success: true,
        code: generatedCode,
        message: 'Contract generated using template (OpenAI not configured)'
      })
    }

    // Use OpenAI for intelligent generation
    const systemPrompt = `You are an expert Solidity smart contract developer. Generate secure, production-ready smart contracts based on user requirements.`
    
    const userPrompt = `Generate a ${contractType} smart contract with the following requirements: ${prompt}. 
    
    Requirements:
    - Use Solidity ^0.8.20
    - Include proper security checks
    - Add comprehensive comments
    - Follow best practices
    - Include relevant events
    
    Return only the Solidity code, no explanation.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const generatedCode = completion.choices[0]?.message?.content || ''

    return NextResponse.json({
      success: true,
      code: generatedCode,
      message: 'Contract generated successfully'
    })
  } catch (error: any) {
    console.error('Contract generation error:', error)
    
    // Fallback to template on error - use default ERC20 template
    const template = CONTRACT_TEMPLATES.erc20
    
    return NextResponse.json({
      success: true,
      code: template.replace(/{TOKEN_NAME}/g, 'MyToken').replace(/{SYMBOL}/g, 'MTK'),
      message: 'Generated using fallback template'
    })
  }
}
