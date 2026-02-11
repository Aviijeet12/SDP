import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User'
    }
  })
  console.log('Created demo user:', user.email)

  // Create some template contracts
  const templates = [
    {
      title: 'ERC-20 Token',
      description: 'Standard ERC-20 token implementation',
      category: 'tokens',
      rating: 4.8,
      uses: 1240,
      tags: 'Token,ERC-20,Beginner',
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyToken {
    string public name = "My Token";
    string public symbol = "MYT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** 18;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
}`
    },
    {
      title: 'ERC-721 NFT',
      description: 'Full-featured NFT contract',
      category: 'nft',
      rating: 4.9,
      uses: 892,
      tags: 'NFT,ERC-721,Intermediate',
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyNFT {
    string public name = "My NFT";
    uint256 public tokenCounter = 0;
    
    mapping(uint256 => address) public tokenOwner;
    
    function mint(address to) public {
        tokenOwner[tokenCounter] = to;
        tokenCounter++;
    }
}`
    }
  ]

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.title },
      update: {},
      create: template
    })
  }
  console.log('Created template contracts')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
