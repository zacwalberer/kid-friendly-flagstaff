import { MetadataRoute } from 'next'
import { getAllActivities, getCategories } from '@/lib/data'

const BASE_URL = 'https://kidfriendlyflagstaff.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const activities = getAllActivities()
  const categories = getCategories()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Activity pages
  const activityPages: MetadataRoute.Sitemap = activities.map((activity) => ({
    url: `${BASE_URL}/activity/${activity.slug}`,
    lastModified: new Date(activity.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...activityPages]
}
