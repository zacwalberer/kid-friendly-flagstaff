import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getHikeActivities, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Hike',
  description: 'Find kid-friendly hiking trails and nature walks in Flagstaff, Arizona.',
  alternates: {
    canonical: '/hike',
  },
  openGraph: {
    title: 'Hike | Kid Friendly Flagstaff',
    description: 'Find kid-friendly hiking trails and nature walks in Flagstaff, Arizona.',
    url: '/hike',
    type: 'website',
  },
}

export default async function HikePage() {
  const activities = await getHikeActivities()
  const category = getCategoryBySlug('hike')!
  const topPick = await getTopPickForCategory('hike')

  return (
    <CategoryPageClient
      category={category}
      activities={activities}
      topPick={topPick}
    />
  )
}
