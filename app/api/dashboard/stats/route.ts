import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user'

    // Get counts
    const [
      contractsCount,
      documentsCount,
      templatesCount,
      verifiedDocsCount
    ] = await Promise.all([
      prisma.contract.count({ where: { userId } }),
      prisma.document.count({ where: { userId } }),
      prisma.template.count(),
      prisma.document.count({ where: { userId, status: 'verified' } })
    ])

    // Get recent activity
    const recentContracts = await prisma.contract.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    const recentDocuments = await prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    const stats = {
      contracts: {
        total: contractsCount,
        deployed: Math.floor(contractsCount * 0.7),
        pending: Math.floor(contractsCount * 0.3)
      },
      documents: {
        total: documentsCount,
        verified: verifiedDocsCount,
        pending: documentsCount - verifiedDocsCount
      },
      templates: {
        total: templatesCount,
        used: Math.floor(templatesCount * 0.6)
      },
      activity: {
        contracts: recentContracts.map((c: any) => ({
          id: c.id,
          name: c.name,
          type: c.type,
          date: c.createdAt
        })),
        documents: recentDocuments.map((d: any) => ({
          id: d.id,
          name: d.name,
          status: d.status,
          date: d.createdAt
        }))
      }
    }

    return NextResponse.json({
      success: true,
      stats
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
