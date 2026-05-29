import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  name:        z.string().min(2),
  email:       z.string().email(),
  phone:       z.string().optional(),
  company:     z.string().optional(),
  eventType:   z.string(),
  eventDate:   z.string().optional(),
  guestCount:  z.number().optional(),
  venue:       z.string().optional(),
  budget:      z.string().optional(),
  description: z.string().optional(),
})

export async function GET() {
  const inquiries = await prisma.eventInquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
  return NextResponse.json(inquiries)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const typeMap: Record<string, any> = {
      Wedding: 'WEDDING', Corporate: 'CORPORATE', Birthday: 'BIRTHDAY',
      'Hotel / Hospitality': 'HOTEL', 'Real Estate': 'REAL_ESTATE', Other: 'OTHER',
    }

    const inquiry = await prisma.eventInquiry.create({
      data: {
        fullName:    data.name,
        email:       data.email,
        phone:       data.phone,
        company:     data.company,
        eventType:   typeMap[data.eventType] ?? 'OTHER',
        eventDate:   data.eventDate ? new Date(data.eventDate) : undefined,
        venue:       data.venue,
        budget:      data.budget,
        description: data.description,
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: 'Internal error.' }, { status: 500 })
  }
}
