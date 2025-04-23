
export const shouldReset = (lastUpdated: Date): boolean => {
  const TIMEOUT_MINUTES = 1

  const now = new Date()
  const diff = now.getTime() - lastUpdated.getTime()
  return diff > TIMEOUT_MINUTES * 60 * 1000
}

