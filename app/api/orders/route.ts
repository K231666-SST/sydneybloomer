import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const orderSchema = z.object({
  items: z.array(z.object({
    flowerId: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
  })),
  deliveryAddress: z.string().optional(),
  deliveryType:    z.enum(['STANDARD', 'EXPRESS', 'SAME_DAY', 'PICKUP']).default('STANDARD'),
  giftMessage:     z.string().optional(),
  notes:           z.string().optional(),
})

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id
  const isAdmin = (session.user as any).role === 'ADMIN'

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { userId },
    include: { items: { include: { flower: true } }, delivery: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json(orders)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  try {
    const body = await req.json()
    const { items, deliveryAddress, deliveryType, giftMessage, notes } = orderSchema.parse(body)

    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
    const deliveryFee = subtotal >= 120 ? 0 : 12
    const total = subtotal + deliveryFee

    const orderNumber = `SB-${Date.now().toString().slice(-8)}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: (session?.user as any)?.id ?? null,
        guestEmail: session ? undefined : body.email,
        subtotal,
        deliveryFee,
        total,
        deliveryAddress,
        deliveryType,
        giftMessage,
        notes,
        items: {
          create: items.map(i => ({
            flowerId:  i.flowerId,
            quantity:  i.quantity,
            unitPrice: i.unitPrice,
            total:     i.unitPrice * i.quantity,
          })),
        },
      },
      include: { items: true },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
