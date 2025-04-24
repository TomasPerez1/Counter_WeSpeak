'use server'
import { prisma } from '../app/lib/prisma'


export async function increment() {
  const counter = await prisma.counter.update({
    where: { id: 1 },
    data: { 
      value: {
        increment: 1,
      } 
    }
  })
  return counter.value;
}

export async function decrement() {
  const counter = await prisma.counter.update({
    where: { id: 1 },
    data: { 
      value: {
        decrement: 1,
      } 
    }
  })
  return counter.value;
}