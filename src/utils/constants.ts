import type { AgeRange, Weather, Amenity, Category, Difficulty, Surface, MealType, EatFeature, CategoryInfo } from '@/types'

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
  'stroller-accessible': 'Stroller Accessible',
  'dog-friendly': 'Dog Friendly',
  'water-fountain': 'Water Fountain',
  'picnic-area': 'Picnic Area',
}

export const AMENITY_ICONS: Record<Amenity, string> = {
  restrooms: '🚻',
  shade: '🌳',
  parking: '🅿️',
  'stroller-accessible': '👶',
  'dog-friendly': '🐕',
  'water-fountain': '💧',
  'picnic-area': '🧺',
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
}

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
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

export const CATEGORY_INFO: CategoryInfo[] = [
  {
    id: 'play',
    name: 'Play',
    description: 'Playgrounds, parks, and indoor play spaces',
    icon: '🎪',
    color: 'bg-pink-500',
    slug: 'play',
  },
  {
    id: 'hike',
    name: 'Hike',
    description: 'Kid-friendly trails and nature walks',
    icon: '🥾',
    color: 'bg-green-500',
    slug: 'hike',
  },
  {
    id: 'eat',
    name: 'Eat',
    description: 'Family-friendly restaurants and cafes',
    icon: '🍕',
    color: 'bg-orange-500',
    slug: 'eat',
  },
  {
    id: 'explore',
    name: 'Explore',
    description: 'Museums, attractions, and adventures',
    icon: '🔭',
    color: 'bg-blue-500',
    slug: 'explore',
  },
  {
    id: 'shop',
    name: 'Shop',
    description: 'Kid-friendly stores and shops',
    icon: '🛍️',
    color: 'bg-purple-500',
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
  'stroller-accessible',
  'dog-friendly',
  'water-fountain',
  'picnic-area',
]
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
