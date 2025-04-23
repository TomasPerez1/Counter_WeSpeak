import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

const TIMEOUT_MINUTES = 1

function shouldReset(lastUpdated: Date): boolean {
  const now = new Date()
  const diff = now.getTime() - lastUpdated.getTime()
  return diff > TIMEOUT_MINUTES * 60 * 1000
}

export async function GET() {
  const counter = await prisma.counter.findUnique({ where: { id: 1 } })

  if (!counter) {
    await prisma.counter.create({ data: { id: 1, value: 0 } })
    return NextResponse.json({ status: 'created', value: 0 })
  }

  if (shouldReset(counter.updatedAt)) {
    const updated = await prisma.counter.update({
      where: { id: 1 },
      data: { value: 0 },
    })

    return NextResponse.json({ status: 'reset', value: updated.value })
  }

  return NextResponse.json({ status: 'no_reset', value: counter.value })
}
