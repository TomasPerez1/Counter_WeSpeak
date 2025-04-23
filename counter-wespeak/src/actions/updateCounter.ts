'use server'

import { prisma } from '../app/lib/prisma'
// import { revalidatePath } from 'next/cache'
import { shouldReset } from '@/app/lib/utils'



export async function increment() {
  const counter = await prisma.counter.findUnique({ where: { id: 1 } })

  if (!counter) {
    await prisma.counter.create({ data: { id: 1, value: 1 } })
    return 0;
  } else {
    if (shouldReset(counter.updatedAt)) { // chequear si es necesario
      await prisma.counter.update({
        where: { id: 1 },
        data: { value: 0 },
      })
    } else {
      await prisma.counter.update({
        where: { id: 1 },
        data: { value: counter.value + 1 },
      })
    }
    return counter.value + 1 
  }

  // revalidatePath('/')
}

export async function decrement() {
  const counter = await prisma.counter.findUnique({ where: { id: 1 } })

  if (!counter) {
    await prisma.counter.create({ data: { id: 1, value: 1 } })
    return 0;
  } else {
    if (shouldReset(counter.updatedAt)) {
      await prisma.counter.update({
        where: { id: 1 },
        data: { value: 0 },
      })
    } else {
      await prisma.counter.update({
        where: { id: 1 },
        data: { value: counter.value - 1 },
      })
    }
    return counter.value - 1;
  }

  // revalidatePath('/')
}