import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getLearnActivities, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Find museums, attractions, and educational experiences for kids in Flagstaff, Arizona.',
  alternates: {
    canonical: '/learn',
  },
  openGraph: {
    title: 'Learn | Kid Friendly Flagstaff',
    description: 'Find museums, attractions, and educational experiences for kids in Flagstaff, Arizona.',
    url: '/learn',
    type: 'website',
  },
}

export default async function LearnPage() {
  const activities = await getLearnActivities()
  const category = getCategoryBySlug('learn')!
  const topPick = await getTopPickForCategory('learn')

  return (
    <CategoryPageClient
      category={category}
      activities={activities}
      topPick={topPick}
    />
  )
}
