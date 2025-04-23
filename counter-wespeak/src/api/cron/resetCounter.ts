import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  await prisma.counter.update({
    where: { id: 1 },
    data: { value: 0 }
  })

  return NextResponse.json({ message: 'Counter reset to 0' })
}