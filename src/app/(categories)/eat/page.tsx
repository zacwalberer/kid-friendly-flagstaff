import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getEatListings, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

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

export default async function EatPage() {
  const listings = await getEatListings()
  const category = getCategoryBySlug('eat')!
  const topPick = await getTopPickForCategory('eat')

  return (
    <CategoryPageClient
      category={category}
      listings={listings}
      topPick={topPick}
    />
  )
}
