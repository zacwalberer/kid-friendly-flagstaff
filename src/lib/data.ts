import type {
  Listing,
  PlayListing,
  HikeListing,
  EatListing,
  LearnListing,
  ShopListing,
  Category,
  CategoryInfo,
} from '@/types'

import {
  fetchListingsFromAirtable,
  fetchListingsByCategoryFromAirtable,
  isAirtableConfigured,
} from './airtable'

import categoriesData from '@/../data/categories.json'

const categories = categoriesData as CategoryInfo[]

// Cache for Airtable data (populated at build time)
let cachedListings: Listing[] | null = null

// Fetch all listings from Airtable
async function fetchAllListings(): Promise<Listing[]> {
  // Return cached data if available
  if (cachedListings) {
    return cachedListings
  }

  if (!isAirtableConfigured()) {
    throw new Error('Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.')
  }

  cachedListings = await fetchListingsFromAirtable()
  console.log(`Fetched ${cachedListings.length} listings from Airtable`)
  return cachedListings
}

// Async API functions
export async function getPlayListings(): Promise<PlayListing[]> {
  const listings = await fetchListingsByCategoryFromAirtable('play')
  return listings as PlayListing[]
}

export async function getHikeListings(): Promise<HikeListing[]> {
  const listings = await fetchListingsByCategoryFromAirtable('hike')
  return listings as HikeListing[]
}

export async function getEatListings(): Promise<EatListing[]> {
  const listings = await fetchListingsByCategoryFromAirtable('eat')
  return listings as EatListing[]
}

export async function getLearnListings(): Promise<LearnListing[]> {
  const listings = await fetchListingsByCategoryFromAirtable('learn')
  return listings as LearnListing[]
}

export async function getShopListings(): Promise<ShopListing[]> {
  const listings = await fetchListingsByCategoryFromAirtable('shop')
  return listings as ShopListing[]
}

export async function getAllListings(): Promise<Listing[]> {
  return fetchAllListings()
}

export async function getListingsByCategory(
  category: Category
): Promise<Listing[]> {
  switch (category) {
    case 'play':
      return getPlayListings()
    case 'hike':
      return getHikeListings()
    case 'eat':
      return getEatListings()
    case 'learn':
      return getLearnListings()
    case 'shop':
      return getShopListings()
    default:
      return []
  }
}

export async function getListingBySlug(
  slug: string
): Promise<Listing | undefined> {
  const listings = await getAllListings()
  return listings.find((listing) => listing.slug === slug)
}

export function getCategories(): CategoryInfo[] {
  return categories
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((category) => category.slug === slug)
}

export async function getTopPicks(): Promise<Listing[]> {
  const listings = await getAllListings()
  return listings.filter((listing) => listing.isTopPick)
}

export async function getTopPickForCategory(
  category: Category
): Promise<Listing | undefined> {
  const listings = await getListingsByCategory(category)
  return listings.find((listing) => listing.isTopPick)
}

export async function getFeaturedListings(
  count: number = 6
): Promise<Listing[]> {
  const all = await getAllListings()
  // Prioritize top picks, then high scores
  const sorted = [...all].sort((a, b) => {
    if (a.isTopPick && !b.isTopPick) return -1
    if (!a.isTopPick && b.isTopPick) return 1
    return b.kidFriendlinessScore - a.kidFriendlinessScore
  })
  return sorted.slice(0, count)
}

export async function getAllSlugs(): Promise<string[]> {
  const listings = await getAllListings()
  return listings.map((listing) => listing.slug)
}
