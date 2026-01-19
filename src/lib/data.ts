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

export function getPlayActivities(): PlayActivity[] {
  return playActivities
}

export function getHikeActivities(): HikeActivity[] {
  return hikeActivities
}

export function getEatActivities(): EatActivity[] {
  return eatActivities
}

export function getExploreActivities(): ExploreActivity[] {
  return exploreActivities
}

export function getShopActivities(): ShopActivity[] {
  return shopActivities
}

export function getAllActivities(): Activity[] {
  return [
    ...playActivities,
    ...hikeActivities,
    ...eatActivities,
    ...exploreActivities,
    ...shopActivities,
  ]
}

export function getActivitiesByCategory(category: Category): Activity[] {
  switch (category) {
    case 'play':
      return playActivities
    case 'hike':
      return hikeActivities
    case 'eat':
      return eatActivities
    case 'explore':
      return exploreActivities
    case 'shop':
      return shopActivities
    default:
      return []
  }
}

export function getActivityBySlug(slug: string): Activity | undefined {
  return getAllActivities().find((activity) => activity.slug === slug)
}

export function getCategories(): CategoryInfo[] {
  return categories
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getTopPicks(): Activity[] {
  return getAllActivities().filter((activity) => activity.isTopPick)
}

export function getTopPickForCategory(category: Category): Activity | undefined {
  return getActivitiesByCategory(category).find((activity) => activity.isTopPick)
}

export function getFeaturedActivities(count: number = 6): Activity[] {
  const all = getAllActivities()
  // Prioritize top picks, then high scores
  const sorted = [...all].sort((a, b) => {
    if (a.isTopPick && !b.isTopPick) return -1
    if (!a.isTopPick && b.isTopPick) return 1
    return b.kidFriendlinessScore - a.kidFriendlinessScore
  })
  return sorted.slice(0, count)
}

export function getAllSlugs(): string[] {
  return getAllActivities().map((activity) => activity.slug)
}
