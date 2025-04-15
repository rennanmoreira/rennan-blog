export const getReadingTime = (text: string): number => {
  // Average reading speed is about 200-250 words per minute
  // We'll use 60 wpm as a conservative estimate only for now
  const wordsPerMinute = 60
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

export const formatReadingTime = (minutes: number): string => {
  if (minutes <= 1) {
    return '1 min read'
  }
  return `${minutes} min read`
}
