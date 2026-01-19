import { Metadata } from 'next'
import { CategoryPageClient } from '@/components/CategoryPageClient'
import { getShopActivities, getCategoryBySlug, getTopPickForCategory } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Find kid-friendly stores and shops in Flagstaff, Arizona.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop | Kid Friendly Flagstaff',
    description: 'Find kid-friendly stores and shops in Flagstaff, Arizona.',
    url: '/shop',
    type: 'website',
  },
}

export default function ShopPage() {
  const activities = getShopActivities()
  const category = getCategoryBySlug('shop')!
  const topPick = getTopPickForCategory('shop')

  return (
    <CategoryPageClient
      category={category}
      activities={activities}
      topPick={topPick}
    />
  )
}
