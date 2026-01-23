export type AgeRange = 'baby' | 'toddler' | 'preschool' | 'elementary' | 'tween'

export type Weather = 'sunny' | 'rainy' | 'snowy' | 'cold'

export type Category = 'play' | 'hike' | 'eat' | 'learn' | 'shop'

export type Accessibility = 'wheelchair' | 'stroller'

export type Setting = 'indoor' | 'outdoor' | 'both'

export type ShadeCoverage = 'none' | 'partial' | 'full'

export type Amenity = 'restrooms' | 'changing-tables' | 'parking' | 'dog-friendly'

export type PriceRange = 'free' | '$' | '$$' | '$$$'

export type Difficulty = 'easy' | 'moderate' | 'hard'

export type Surface = 'paved' | 'gravel' | 'dirt' | 'mixed'

export type HikeType = 'loop' | 'out-and-back'

export type HikeFeature = 'view' | 'waterfall' | 'lake' | 'pond' | 'wildlife' | 'rock-formations'

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'brunch' | 'drinks' | 'bakery' | 'cafe' | 'happy-hour'

export type EatFeature =
  | 'kids-menu'
  | 'high-chairs'
  | 'outdoor-seating'
  | 'coloring'
  | 'play-area'
  | 'quick-service'
  | 'reservations'
  | 'entertainment'

export type PlayType =
  | 'playground'
  | 'arcade'
  | 'open-space'
  | 'ice-rink'
  | 'pool'
  | 'snow-sports'
  | 'aerial'
  | 'bowling'
  | 'gardens'

export type PlayFeature =
  | 'court'
  | 'field'
  | 'splash-pad'
  | 'skate-park'
  | 'disc-golf'
  | 'ice-rink'
  | 'pool'
  | 'golf'
  | 'bike-course'
  | 'sledding'
  | 'downhill-skiing'
  | 'snowboarding'
  | 'cross-country-skiing'

export type LearnType =
  | 'museum'
  | 'nature'
  | 'attraction'
  | 'historic-site'
  | 'zoo'
  | 'national-monument'
  | 'national-park'
  | 'observatory'

export type LearnFeature =
  | 'activities'
  | 'exhibits'
  | 'scenic'
  | 'tours'
  | 'demonstrations'
  | 'gift-shop'
  | 'cafe'
  | 'restaurant'
  | 'workshops'
  | 'wildlife'

export type ShopType = 'toys' | 'books' | 'clothing' | 'general' | 'outdoor-market' | 'boutique'

export type ShopFeature =
  | 'educational'
  | 'activities'
  | 'demonstrations'
  | 'story-time'
  | 'art'
  | 'board-games'
  | 'souvenirs'
  | 'outdoor-gear'

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
  priceRange?: PriceRange[]
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
  playType: PlayType
  setting: Setting
  hasFencedArea?: boolean
  shadeCoverage?: ShadeCoverage
  hasWaterFountain?: boolean
  hasPicnicTable?: boolean
  features?: PlayFeature[]
}

export interface HikeActivity extends BaseActivity {
  category: 'hike'
  difficulty: Difficulty
  distance: string
  elevationGain?: string
  surface: Surface
  hikeType: HikeType
  trailheadParking?: string
  bestSeason?: string[]
  features?: HikeFeature[]
  shadeCoverage?: ShadeCoverage
  duration?: string
  hasWaterFountain?: boolean
  hasPicnicTable?: boolean
}

export interface EatActivity extends BaseActivity {
  category: 'eat'
  cuisine: string
  mealTypes: MealType[]
  features: EatFeature[]
  noiseLevel?: 'quiet' | 'moderate' | 'loud'
}

export interface LearnActivity extends BaseActivity {
  category: 'learn'
  learnType: LearnType
  setting: Setting
  admissionRequired: boolean
  advanceBooking?: boolean
  features?: LearnFeature[]
}

export interface ShopActivity extends BaseActivity {
  category: 'shop'
  shopType: ShopType
  features?: ShopFeature[]
}

// Union type for all activities
export type Activity =
  | PlayActivity
  | HikeActivity
  | EatActivity
  | LearnActivity
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

export function isLearnActivity(activity: Activity): activity is LearnActivity {
  return activity.category === 'learn'
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
