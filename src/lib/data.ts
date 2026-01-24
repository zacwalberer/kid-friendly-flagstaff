import type {
  Activity,
  PlayActivity,
  HikeActivity,
  EatActivity,
  LearnActivity,
  ShopActivity,
  Category,
  CategoryInfo,
} from '@/types'

import {
  fetchActivitiesFromAirtable,
  fetchActivitiesByCategoryFromAirtable,
  isAirtableConfigured,
} from './airtable'

import categoriesData from '@/../data/categories.json'

const categories = categoriesData as CategoryInfo[]

// Cache for Airtable data (populated at build time)
let cachedActivities: Activity[] | null = null

// Fetch all activities from Airtable
async function fetchAllActivities(): Promise<Activity[]> {
  // Return cached data if available
  if (cachedActivities) {
    return cachedActivities
  }

  if (!isAirtableConfigured()) {
    throw new Error('Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.')
  }

  cachedActivities = await fetchActivitiesFromAirtable()
  console.log(`Fetched ${cachedActivities.length} activities from Airtable`)
  return cachedActivities
}

// Async API functions
export async function getPlayActivities(): Promise<PlayActivity[]> {
  const activities = await fetchActivitiesByCategoryFromAirtable('play')
  return activities as PlayActivity[]
}

export async function getHikeActivities(): Promise<HikeActivity[]> {
  const activities = await fetchActivitiesByCategoryFromAirtable('hike')
  return activities as HikeActivity[]
}

export async function getEatActivities(): Promise<EatActivity[]> {
  const activities = await fetchActivitiesByCategoryFromAirtable('eat')
  return activities as EatActivity[]
}

export async function getLearnActivities(): Promise<LearnActivity[]> {
  const activities = await fetchActivitiesByCategoryFromAirtable('learn')
  return activities as LearnActivity[]
}

export async function getShopActivities(): Promise<ShopActivity[]> {
  const activities = await fetchActivitiesByCategoryFromAirtable('shop')
  return activities as ShopActivity[]
}

export async function getAllActivities(): Promise<Activity[]> {
  return fetchAllActivities()
}

export async function getActivitiesByCategory(
  category: Category
): Promise<Activity[]> {
  switch (category) {
    case 'play':
      return getPlayActivities()
    case 'hike':
      return getHikeActivities()
    case 'eat':
      return getEatActivities()
    case 'learn':
      return getLearnActivities()
    case 'shop':
      return getShopActivities()
    default:
      return []
  }
}

export async function getActivityBySlug(
  slug: string
): Promise<Activity | undefined> {
  const activities = await getAllActivities()
  return activities.find((activity) => activity.slug === slug)
}

export function getCategories(): CategoryInfo[] {
  return categories
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((category) => category.slug === slug)
}

export async function getTopPicks(): Promise<Activity[]> {
  const activities = await getAllActivities()
  return activities.filter((activity) => activity.isTopPick)
}

export async function getTopPickForCategory(
  category: Category
): Promise<Activity | undefined> {
  const activities = await getActivitiesByCategory(category)
  return activities.find((activity) => activity.isTopPick)
}

export async function getFeaturedActivities(
  count: number = 6
): Promise<Activity[]> {
  const all = await getAllActivities()
  // Prioritize top picks, then high scores
  const sorted = [...all].sort((a, b) => {
    if (a.isTopPick && !b.isTopPick) return -1
    if (!a.isTopPick && b.isTopPick) return 1
    return b.kidFriendlinessScore - a.kidFriendlinessScore
  })
  return sorted.slice(0, count)
}

export async function getAllSlugs(): Promise<string[]> {
  const activities = await getAllActivities()
  return activities.map((activity) => activity.slug)
}
