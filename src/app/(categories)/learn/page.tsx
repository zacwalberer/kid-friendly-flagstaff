import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getLearnListings, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

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
  const listings = await getLearnListings()
  const category = getCategoryBySlug('learn')!
  const topPick = await getTopPickForCategory('learn')

  return (
    <CategoryPageClient
      category={category}
      listings={listings}
      topPick={topPick}
    />
  )
}
