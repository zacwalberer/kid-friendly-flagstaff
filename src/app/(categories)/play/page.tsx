import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getPlayActivities, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Play',
  description: 'Discover kid-friendly playgrounds, parks, and indoor play spaces in Flagstaff, Arizona.',
}

export default function PlayPage() {
  const activities = getPlayActivities()
  const category = getCategoryBySlug('play')!
  const topPick = getTopPickForCategory('play')

  return (
    <CategoryPageClient
      category={category}
      activities={activities}
      topPick={topPick}
    />
  )
}
