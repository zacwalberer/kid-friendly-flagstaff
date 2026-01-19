import { Hero, CategoryCards, FeaturedActivities } from '@/components/home'
import { NewsletterSignup } from '@/components/newsletter'
import { getFeaturedActivities, getAllActivities } from '@/lib/data'
import type { Category } from '@/types'

export default function HomePage() {
  const featuredActivities = getFeaturedActivities(6)
  const allActivities = getAllActivities()

  // Count activities per category
  const activityCounts = allActivities.reduce(
    (acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + 1
      return acc
    },
    {} as Record<Category, number>
  )

  return (
    <div>
      <Hero />
      <CategoryCards activityCounts={activityCounts} />
      <FeaturedActivities activities={featuredActivities} />
      <NewsletterSignup />
    </div>
  )
}
