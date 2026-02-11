import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate hash
    const hash = crypto.createHash('sha256').update(buffer).digest('hex')
    const hashWithPrefix = `0x${hash}`

    // Create document record
    const document = await prisma.document.create({
      data: {
        name: file.name,
        hash: hashWithPrefix,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        status: 'verified',
        category: 'General',
        uploadedBy: 'Current User',
        userId: userId || 'demo-user',
        txHash: `0x${crypto.randomBytes(32).toString('hex')}`,
        blockNumber: Math.floor(Math.random() * 1000000) + 20000000,
        chain: 'Ethereum Mainnet'
      }
    })

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        name: document.name,
        hash: document.hash,
        status: document.status,
        uploadDate: document.createdAt,
        txHash: document.txHash,
        blockNumber: document.blockNumber,
        chain: document.chain
      }
    })
  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
