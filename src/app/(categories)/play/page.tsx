import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getPlayListings, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Play',
  description: 'Discover kid-friendly playgrounds, parks, and indoor play spaces in Flagstaff, Arizona.',
  alternates: {
    canonical: '/play',
  },
  openGraph: {
    title: 'Play | Kid Friendly Flagstaff',
    description: 'Discover kid-friendly playgrounds, parks, and indoor play spaces in Flagstaff, Arizona.',
    url: '/play',
    type: 'website',
  },
}

export default async function PlayPage() {
  const listings = await getPlayListings()
  const category = getCategoryBySlug('play')!
  const topPick = await getTopPickForCategory('play')

  return (
    <CategoryPageClient
      category={category}
      listings={listings}
      topPick={topPick}
    />
  )
}
