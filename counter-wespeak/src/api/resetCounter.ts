import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

const TIMEOUT_MINUTES = 1

export async function GET() {
  const counter = await prisma.counter.findUnique({
    where: { id: 1 },
  })

  if (!counter) {
    return NextResponse.json({ message: 'Counter not found' }, { status: 404 })
  }

  const now = new Date()
  const lastUpdated = new Date(counter.updatedAt)
  const diff = now.getTime() - lastUpdated.getTime()

  if (diff > TIMEOUT_MINUTES * 60 * 1000) {
    await prisma.counter.update({
      where: { id: 1 },
      data: { value: 0 },
    })
    return NextResponse.json({ message: 'Counter reset to 0' })
  }

  return NextResponse.json({ message: 'No reset needed' })
}
