'use server'

import { prisma } from '../app/lib/prisma';
import { Counter } from '@prisma/client';

export async function getCounter(): Promise<Counter>{
  const counter = await prisma.counter.findUnique({ where: { id: 1 } });

  if (!counter) {
    return await prisma.counter.create({ data: { id: 1, value: 0 } })
  }

  return counter;
}
