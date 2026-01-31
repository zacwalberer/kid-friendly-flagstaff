import { Hero, CategoryCards, FeaturedListings } from '@/components/home'
import { NewsletterSignup } from '@/components/newsletter'
import { getFeaturedListings, getAllListings } from '@/lib/data'
import type { Category } from '@/types'

export default async function HomePage() {
  const featuredListings = await getFeaturedListings(6)
  const allListings = await getAllListings()

  // Count listings per category
  const listingCounts = allListings.reduce(
    (acc, listing) => {
      acc[listing.category] = (acc[listing.category] || 0) + 1
      return acc
    },
    {} as Record<Category, number>
  )

  return (
    <div>
      <Hero />
      <CategoryCards listingCounts={listingCounts} />
      <FeaturedListings listings={featuredListings} />
      <NewsletterSignup />
    </div>
  )
}
