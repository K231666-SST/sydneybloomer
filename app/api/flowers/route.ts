import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const season   = searchParams.get('season') ?? undefined
  const origin   = searchParams.get('origin') ?? undefined
  const category = searchParams.get('category') ?? undefined
  const featured = searchParams.get('featured')
  const page     = Number(searchParams.get('page') ?? 1)
  const limit    = Number(searchParams.get('limit') ?? 12)

  const where: any = { isActive: true }
  if (season)   where.season = season
  if (origin)   where.origin = origin
  if (featured) where.isFeatured = featured === 'true'
  if (category) where.category = { slug: category }

  const [flowers, total] = await Promise.all([
    prisma.flower.findMany({
      where,
      include: { category: true, inventory: true },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.flower.count({ where }),
  ])

  return NextResponse.json({ flowers, total, page, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const flower = await prisma.flower.create({ data: body })
  return NextResponse.json(flower, { status: 201 })
}
