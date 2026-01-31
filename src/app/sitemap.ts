import { MetadataRoute } from 'next'
import { getAllListings, getCategories } from '@/lib/data'

const BASE_URL = 'https://kidfriendlyflagstaff.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getAllListings()
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

  // Listing pages
  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${BASE_URL}/listing/${listing.slug}`,
    lastModified: new Date(listing.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...listingPages]
}
