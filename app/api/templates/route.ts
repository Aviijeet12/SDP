import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const templates = await prisma.template.findMany({
      where: category && category !== 'all' ? { category } : undefined,
      orderBy: { rating: 'desc' }
    })

    return NextResponse.json({
      success: true,
      templates
    })
  } catch (error) {
    console.error('Templates fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, code, tags } = await request.json()

    if (!title || !code) {
      return NextResponse.json(
        { error: 'Title and code are required' },
        { status: 400 }
      )
    }

    const template = await prisma.template.create({
      data: {
        title,
        description: description || '',
        category: category || 'utility',
        code,
        tags: Array.isArray(tags) ? tags.join(',') : tags || ''
      }
    })

    return NextResponse.json({
      success: true,
      template
    })
  } catch (error) {
    console.error('Template creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
