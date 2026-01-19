import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getExploreActivities, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Find museums, attractions, and adventures for kids in Flagstaff, Arizona.',
  alternates: {
    canonical: '/explore',
  },
  openGraph: {
    title: 'Explore | Kid Friendly Flagstaff',
    description: 'Find museums, attractions, and adventures for kids in Flagstaff, Arizona.',
    url: '/explore',
    type: 'website',
  },
}

export default async function ExplorePage() {
  const activities = await getExploreActivities()
  const category = getCategoryBySlug('explore')!
  const topPick = await getTopPickForCategory('explore')

  return (
    <CategoryPageClient
      category={category}
      activities={activities}
      topPick={topPick}
    />
  )
}
