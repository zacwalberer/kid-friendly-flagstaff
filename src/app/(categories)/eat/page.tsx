import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getEatActivities, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Eat',
  description: 'Discover family-friendly restaurants and cafes in Flagstaff, Arizona.',
  alternates: {
    canonical: '/eat',
  },
  openGraph: {
    title: 'Eat | Kid Friendly Flagstaff',
    description: 'Discover family-friendly restaurants and cafes in Flagstaff, Arizona.',
    url: '/eat',
    type: 'website',
  },
}

export default function EatPage() {
  const activities = getEatActivities()
  const category = getCategoryBySlug('eat')!
  const topPick = getTopPickForCategory('eat')

  return (
    <CategoryPageClient
      category={category}
      activities={activities}
      topPick={topPick}
    />
  )
}
