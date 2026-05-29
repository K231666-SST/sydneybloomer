import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(8),
  role:     z.enum(['CUSTOMER', 'WHOLESALE']).default('CUSTOMER'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role } = schema.parse(body)

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json({ message: 'Email already registered.' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    await prisma.user.create({ data: { name, email, password: hashed, role } })

    return NextResponse.json({ message: 'Account created.' }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
