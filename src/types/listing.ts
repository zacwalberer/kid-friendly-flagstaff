export type AgeRange = 'baby' | 'toddler' | 'preschool' | 'elementary' | 'tween'

export type Weather = 'sunny' | 'rainy' | 'snowy' | 'cold'

export type Category = 'play' | 'hike' | 'eat' | 'learn' | 'shop'

export type Accessibility = 'wheelchair' | 'stroller'

export type Setting = 'indoor' | 'outdoor' | 'both'

export type ShadeCoverage = 'none' | 'partial' | 'full'

export type Amenity = 'restrooms' | 'changing-tables' | 'parking' | 'dog-friendly'

export type PriceRange = 'free' | '$' | '$$' | '$$$'

export type Difficulty = 'easy' | 'moderate' | 'hard'

export type Surface = 'paved' | 'gravel' | 'rocky' | 'mixed'

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

// Base listing interface
export interface BaseListing {
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
  priceRange?: PriceRange
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

// Category-specific listing interfaces
export interface PlayListing extends BaseListing {
  category: 'play'
  playType: PlayType
  setting: Setting
  hasFencedArea?: boolean
  shadeCoverage?: ShadeCoverage
  hasWaterFountain?: boolean
  hasPicnicTable?: boolean
  features?: PlayFeature[]
}

export interface HikeListing extends BaseListing {
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

export interface EatListing extends BaseListing {
  category: 'eat'
  cuisine: string
  mealTypes: MealType[]
  features: EatFeature[]
  noiseLevel?: 'quiet' | 'moderate' | 'loud'
}

export interface LearnListing extends BaseListing {
  category: 'learn'
  learnType: LearnType
  setting: Setting
  admissionRequired: boolean
  advanceBooking?: boolean
  features?: LearnFeature[]
}

export interface ShopListing extends BaseListing {
  category: 'shop'
  shopType: ShopType
  features?: ShopFeature[]
}

// Union type for all listings
export type Listing =
  | PlayListing
  | HikeListing
  | EatListing
  | LearnListing
  | ShopListing

// Type guards
export function isPlayListing(listing: Listing): listing is PlayListing {
  return listing.category === 'play'
}

export function isHikeListing(listing: Listing): listing is HikeListing {
  return listing.category === 'hike'
}

export function isEatListing(listing: Listing): listing is EatListing {
  return listing.category === 'eat'
}

export function isLearnListing(listing: Listing): listing is LearnListing {
  return listing.category === 'learn'
}

export function isShopListing(listing: Listing): listing is ShopListing {
  return listing.category === 'shop'
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
