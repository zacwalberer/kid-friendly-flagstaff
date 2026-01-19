import type {
  Activity,
  PlayActivity,
  HikeActivity,
  EatActivity,
  ExploreActivity,
  ShopActivity,
  Category,
  CategoryInfo,
} from '@/types'

import {
  fetchActivitiesFromAirtable,
  fetchActivitiesByCategoryFromAirtable,
  isAirtableConfigured,
} from './airtable'

// JSON fallback imports
import playData from '@/../data/activities/play.json'
import hikeData from '@/../data/activities/hike.json'
import eatData from '@/../data/activities/eat.json'
import exploreData from '@/../data/activities/explore.json'
import shopData from '@/../data/activities/shop.json'
import categoriesData from '@/../data/categories.json'

// Type assertions for imported JSON
const playActivities = playData as PlayActivity[]
const hikeActivities = hikeData as HikeActivity[]
const eatActivities = eatData as EatActivity[]
const exploreActivities = exploreData as ExploreActivity[]
const shopActivities = shopData as ShopActivity[]
const categories = categoriesData as CategoryInfo[]

// Cache for Airtable data (populated at build time)
let cachedActivities: Activity[] | null = null

// Fetch all activities (from Airtable or JSON fallback)
async function fetchAllActivities(): Promise<Activity[]> {
  // Return cached data if available
  if (cachedActivities) {
    return cachedActivities
  }

  // Try Airtable if configured
  if (isAirtableConfigured()) {
    try {
      cachedActivities = await fetchActivitiesFromAirtable()
      console.log(`Fetched ${cachedActivities.length} activities from Airtable`)
      return cachedActivities
    } catch (error) {
      console.error('Failed to fetch from Airtable, falling back to JSON:', error)
    }
  }

  // Fallback to JSON files
  cachedActivities = [
    ...playActivities,
    ...hikeActivities,
    ...eatActivities,
    ...exploreActivities,
    ...shopActivities,
  ]
  return cachedActivities
}

// Category-specific getters using JSON fallback
function getPlayActivitiesFromJson(): PlayActivity[] {
  return playActivities
}

function getHikeActivitiesFromJson(): HikeActivity[] {
  return hikeActivities
}

function getEatActivitiesFromJson(): EatActivity[] {
  return eatActivities
}

function getExploreActivitiesFromJson(): ExploreActivity[] {
  return exploreActivities
}

function getShopActivitiesFromJson(): ShopActivity[] {
  return shopActivities
}

// Async API functions
export async function getPlayActivities(): Promise<PlayActivity[]> {
  if (isAirtableConfigured()) {
    const activities = await fetchActivitiesByCategoryFromAirtable('play')
    return activities as PlayActivity[]
  }
  return getPlayActivitiesFromJson()
}

export async function getHikeActivities(): Promise<HikeActivity[]> {
  if (isAirtableConfigured()) {
    const activities = await fetchActivitiesByCategoryFromAirtable('hike')
    return activities as HikeActivity[]
  }
  return getHikeActivitiesFromJson()
}

export async function getEatActivities(): Promise<EatActivity[]> {
  if (isAirtableConfigured()) {
    const activities = await fetchActivitiesByCategoryFromAirtable('eat')
    return activities as EatActivity[]
  }
  return getEatActivitiesFromJson()
}

export async function getExploreActivities(): Promise<ExploreActivity[]> {
  if (isAirtableConfigured()) {
    const activities = await fetchActivitiesByCategoryFromAirtable('explore')
    return activities as ExploreActivity[]
  }
  return getExploreActivitiesFromJson()
}

export async function getShopActivities(): Promise<ShopActivity[]> {
  if (isAirtableConfigured()) {
    const activities = await fetchActivitiesByCategoryFromAirtable('shop')
    return activities as ShopActivity[]
  }
  return getShopActivitiesFromJson()
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
    case 'explore':
      return getExploreActivities()
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
