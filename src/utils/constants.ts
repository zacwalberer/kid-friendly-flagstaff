import type { AgeRange, Weather, Amenity, Category, Difficulty, Surface, MealType, EatFeature, CategoryInfo, Accessibility, Setting, ShadeCoverage } from '@/types'

export const AGE_LABELS: Record<AgeRange, string> = {
  baby: '0-1 years',
  toddler: '1-3 years',
  preschool: '3-5 years',
  elementary: '5-12 years',
  tween: '10-14 years',
}

export const AGE_DISPLAY_NAMES: Record<AgeRange, string> = {
  baby: 'Baby',
  toddler: 'Toddler',
  preschool: 'Preschool',
  elementary: 'Elementary',
  tween: 'Tween',
}

export const WEATHER_LABELS: Record<Weather, string> = {
  sunny: 'Sunny Days',
  rainy: 'Rainy Days',
  snowy: 'Snow Days',
  cold: 'Cold Weather',
}

export const WEATHER_ICONS: Record<Weather, string> = {
  sunny: '☀️',
  rainy: '🌧️',
  snowy: '❄️',
  cold: '🥶',
}

export const AMENITY_LABELS: Record<Amenity, string> = {
  restrooms: 'Restrooms',
  shade: 'Shaded Area',
  parking: 'Parking',
  'dog-friendly': 'Dog Friendly',
  'water-fountain': 'Water Fountain',
  'picnic-area': 'Picnic Area',
}

export const AMENITY_ICONS: Record<Amenity, string> = {
  restrooms: '🚻',
  shade: '🌳',
  parking: '🅿️',
  'dog-friendly': '🐕',
  'water-fountain': '💧',
  'picnic-area': '🧺',
}

export const ACCESSIBILITY_LABELS: Record<Accessibility, string> = {
  wheelchair: 'Wheelchair Accessible',
  stroller: 'Stroller Friendly',
}

export const ACCESSIBILITY_ICONS: Record<Accessibility, string> = {
  wheelchair: '♿',
  stroller: '👶',
}

export const SETTING_LABELS: Record<Setting, string> = {
  indoor: 'Indoor',
  outdoor: 'Outdoor',
  both: 'Indoor & Outdoor',
}

export const SETTING_ICONS: Record<Setting, string> = {
  indoor: '🏠',
  outdoor: '🌲',
  both: '🏕️',
}

export const SHADE_COVERAGE_LABELS: Record<ShadeCoverage, string> = {
  none: 'No Shade',
  partial: 'Partial Shade',
  full: 'Full Shade',
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
}

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-[var(--forest-100)] text-[var(--forest-700)]',
  moderate: 'bg-[var(--aspen-300)] text-[var(--forest-900)]',
  hard: 'bg-[var(--bark-400)] text-white',
}

export const SURFACE_LABELS: Record<Surface, string> = {
  paved: 'Paved',
  gravel: 'Gravel',
  dirt: 'Dirt',
  mixed: 'Mixed',
}

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  brunch: 'Brunch',
}

export const EAT_FEATURE_LABELS: Record<EatFeature, string> = {
  'kids-menu': 'Kids Menu',
  highchairs: 'Highchairs',
  'outdoor-seating': 'Outdoor Seating',
  'quick-service': 'Quick Service',
  reservations: 'Reservations',
  entertainment: 'Entertainment',
}

export const EAT_FEATURE_ICONS: Record<EatFeature, string> = {
  'kids-menu': '🍽️',
  highchairs: '🪑',
  'outdoor-seating': '🌞',
  'quick-service': '⚡',
  reservations: '📅',
  entertainment: '🎭',
}

// Category info with forest-themed colors
export const CATEGORY_INFO: CategoryInfo[] = [
  {
    id: 'play',
    name: 'Play',
    description: 'Playgrounds, parks, and indoor play spaces',
    icon: 'Tent',
    color: 'bg-category-play',
    slug: 'play',
  },
  {
    id: 'hike',
    name: 'Hike',
    description: 'Kid-friendly trails and nature walks',
    icon: 'Footprints',
    color: 'bg-category-hike',
    slug: 'hike',
  },
  {
    id: 'eat',
    name: 'Eat',
    description: 'Family-friendly restaurants and cafes',
    icon: 'UtensilsCrossed',
    color: 'bg-category-eat',
    slug: 'eat',
  },
  {
    id: 'explore',
    name: 'Explore',
    description: 'Museums, attractions, and adventures',
    icon: 'Telescope',
    color: 'bg-category-explore',
    slug: 'explore',
  },
  {
    id: 'shop',
    name: 'Shop',
    description: 'Kid-friendly stores and shops',
    icon: 'ShoppingBag',
    color: 'bg-category-shop',
    slug: 'shop',
  },
]

export const getCategoryInfo = (category: Category): CategoryInfo => {
  const info = CATEGORY_INFO.find((c) => c.id === category)
  if (!info) throw new Error(`Unknown category: ${category}`)
  return info
}

export const ALL_AGE_RANGES: AgeRange[] = ['baby', 'toddler', 'preschool', 'elementary', 'tween']
export const ALL_WEATHER: Weather[] = ['sunny', 'rainy', 'snowy', 'cold']
export const ALL_AMENITIES: Amenity[] = [
  'restrooms',
  'shade',
  'parking',
  'dog-friendly',
  'water-fountain',
  'picnic-area',
]
export const ALL_ACCESSIBILITY: Accessibility[] = ['wheelchair', 'stroller']
export const ALL_SETTINGS: Setting[] = ['indoor', 'outdoor', 'both']
export const ALL_SHADE_COVERAGES: ShadeCoverage[] = ['none', 'partial', 'full']
export const ALL_DIFFICULTIES: Difficulty[] = ['easy', 'moderate', 'hard']
export const ALL_SURFACES: Surface[] = ['paved', 'gravel', 'dirt', 'mixed']
export const ALL_MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'brunch']
export const ALL_EAT_FEATURES: EatFeature[] = [
  'kids-menu',
  'highchairs',
  'outdoor-seating',
  'quick-service',
  'reservations',
  'entertainment',
]
