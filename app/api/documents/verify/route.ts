import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const { hash, documentId } = await request.json()

    if (!hash && !documentId) {
      return NextResponse.json(
        { error: 'Hash or document ID is required' },
        { status: 400 }
      )
    }

    // Find document by hash or ID
    const document = await prisma.document.findFirst({
      where: {
        OR: [
          { hash: hash },
          { id: documentId }
        ]
      }
    })

    if (!document) {
      return NextResponse.json({
        success: true,
        verified: false,
        status: 'not_found',
        message: 'Document not found in blockchain records'
      })
    }

    return NextResponse.json({
      success: true,
      verified: document.status === 'verified',
      status: document.status,
      document: {
        hash: document.hash,
        name: document.name,
        uploadedDate: document.createdAt,
        lastModified: document.updatedAt,
        chain: document.chain,
        blockNumber: document.blockNumber,
        txHash: document.txHash,
        uploadedBy: document.uploadedBy
      }
    })
  } catch (error) {
    console.error('Document verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
