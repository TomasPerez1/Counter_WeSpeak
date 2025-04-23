'use server'

import { prisma } from '../app/lib/prisma'


export async function getCounter() {
  const counter = await prisma.counter.findUnique({ where: { id: 1 } })

  if (!counter) {
    return await prisma.counter.create({ data: { id: 1, value: 0 } })
  }

  return counter
}
