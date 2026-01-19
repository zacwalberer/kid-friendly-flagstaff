export type AgeRange = 'baby' | 'toddler' | 'preschool' | 'elementary' | 'tween'

export type Weather = 'sunny' | 'rainy' | 'snowy' | 'cold'

export type Category = 'play' | 'hike' | 'eat' | 'explore' | 'shop'

export type Accessibility = 'wheelchair' | 'stroller'

export type Setting = 'indoor' | 'outdoor' | 'both'

export type ShadeCoverage = 'none' | 'partial' | 'full'

export type Amenity =
  | 'restrooms'
  | 'shade'
  | 'parking'
  | 'dog-friendly'
  | 'water-fountain'
  | 'picnic-area'

export type Difficulty = 'easy' | 'moderate' | 'hard'

export type Surface = 'paved' | 'gravel' | 'dirt' | 'mixed'

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'brunch'

export type EatFeature =
  | 'kids-menu'
  | 'highchairs'
  | 'outdoor-seating'
  | 'quick-service'
  | 'reservations'
  | 'entertainment'

// Base activity interface
export interface BaseActivity {
  id: string
  slug: string
  name: string
  category: Category
  description: string
  shortDescription: string
  address: string
  phone?: string
  website?: string
  hours?: string
  priceRange?: string
  kidFriendlinessScore: 1 | 2 | 3 | 4 | 5
  ageRanges: AgeRange[]
  weather: Weather[]
  amenities: Amenity[]
  accessibility?: Accessibility[]
  images: string[]
  isTopPick?: boolean
  topPickReason?: string
  tips?: string[]
  coordinates?: {
    lat: number
    lng: number
  }
  lastUpdated: string
}

// Category-specific activity interfaces
export interface PlayActivity extends BaseActivity {
  category: 'play'
  playType: 'playground' | 'indoor-play' | 'sports' | 'splash-pad' | 'arcade'
  setting: Setting
  hasFencedArea?: boolean
  ageGroupSections?: string[]
  features?: string[]
}

export interface HikeActivity extends BaseActivity {
  category: 'hike'
  difficulty: Difficulty
  distance: string
  elevationGain?: string
  surface: Surface
  isLoop: boolean
  trailheadParking?: string
  bestSeason?: string[]
  features?: string[]
  shadeCoverage?: ShadeCoverage
  duration?: string
}

export interface EatActivity extends BaseActivity {
  category: 'eat'
  cuisine: string
  mealTypes: MealType[]
  features: EatFeature[]
  averageMealTime?: string
  noiseLevel?: 'quiet' | 'moderate' | 'loud'
  changingTables?: boolean
}

export interface ExploreActivity extends BaseActivity {
  category: 'explore'
  exploreType: 'museum' | 'nature' | 'attraction' | 'historic-site' | 'adventure'
  setting: Setting
  admissionRequired: boolean
  advanceBooking?: boolean
  features?: string[]
}

export interface ShopActivity extends BaseActivity {
  category: 'shop'
  shopType: 'toys' | 'books' | 'clothing' | 'resale' | 'general'
  hasPlayArea?: boolean
  kidsFocused: boolean
  features?: string[]
}

// Union type for all activities
export type Activity =
  | PlayActivity
  | HikeActivity
  | EatActivity
  | ExploreActivity
  | ShopActivity

// Type guards
export function isPlayActivity(activity: Activity): activity is PlayActivity {
  return activity.category === 'play'
}

export function isHikeActivity(activity: Activity): activity is HikeActivity {
  return activity.category === 'hike'
}

export function isEatActivity(activity: Activity): activity is EatActivity {
  return activity.category === 'eat'
}

export function isExploreActivity(activity: Activity): activity is ExploreActivity {
  return activity.category === 'explore'
}

export function isShopActivity(activity: Activity): activity is ShopActivity {
  return activity.category === 'shop'
}

// Category metadata
export interface CategoryInfo {
  id: Category
  name: string
  description: string
  icon: string
  color: string
  slug: string
}
