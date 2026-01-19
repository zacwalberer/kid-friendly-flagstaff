import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getExploreActivities, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Find museums, attractions, and adventures for kids in Flagstaff, Arizona.',
}

export default function ExplorePage() {
  const activities = getExploreActivities()
  const category = getCategoryBySlug('explore')!
  const topPick = getTopPickForCategory('explore')

  return (
    <CategoryPageClient
      category={category}
      activities={activities}
      topPick={topPick}
    />
  )
}
