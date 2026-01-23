import type {
  AgeRange,
  Weather,
  Amenity,
  Category,
  Difficulty,
  Surface,
  MealType,
  EatFeature,
  CategoryInfo,
  Accessibility,
  Setting,
  ShadeCoverage,
  PriceRange,
  HikeType,
  HikeFeature,
  PlayType,
  PlayFeature,
  LearnType,
  LearnFeature,
  ShopType,
  ShopFeature,
} from '@/types'

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
  'changing-tables': 'Changing Tables',
  parking: 'Parking',
  'dog-friendly': 'Dog Friendly',
}

export const AMENITY_ICONS: Record<Amenity, string> = {
  restrooms: '🚻',
  'changing-tables': '🚼',
  parking: '🅿️',
  'dog-friendly': '🐕',
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

export const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  free: 'Free',
  $: '$',
  $$: '$$',
  $$$: '$$$',
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

export const HIKE_TYPE_LABELS: Record<HikeType, string> = {
  loop: 'Loop',
  'out-and-back': 'Out and Back',
}

export const HIKE_FEATURE_LABELS: Record<HikeFeature, string> = {
  view: 'View',
  waterfall: 'Waterfall',
  lake: 'Lake',
  pond: 'Pond',
  wildlife: 'Wildlife',
  'rock-formations': 'Rock Formations',
}

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  brunch: 'Brunch',
  drinks: 'Drinks',
  bakery: 'Bakery',
  cafe: 'Café',
  'happy-hour': 'Happy Hour',
}

export const EAT_FEATURE_LABELS: Record<EatFeature, string> = {
  'kids-menu': 'Kids Menu',
  'high-chairs': 'High Chairs',
  'outdoor-seating': 'Outdoor Seating',
  coloring: 'Coloring',
  'play-area': 'Play Area',
  'quick-service': 'Quick Service',
  reservations: 'Reservations',
  entertainment: 'Entertainment',
}

export const EAT_FEATURE_ICONS: Record<EatFeature, string> = {
  'kids-menu': '🍽️',
  'high-chairs': '🪑',
  'outdoor-seating': '🌞',
  coloring: '🖍️',
  'play-area': '🎠',
  'quick-service': '⚡',
  reservations: '📅',
  entertainment: '🎭',
}

export const PLAY_TYPE_LABELS: Record<PlayType, string> = {
  playground: 'Playground',
  arcade: 'Arcade',
  'open-space': 'Open Space',
  'ice-rink': 'Ice Rink',
  pool: 'Pool',
  'snow-sports': 'Snow Sports',
  aerial: 'Aerial',
  bowling: 'Bowling',
  gardens: 'Gardens',
}

export const PLAY_FEATURE_LABELS: Record<PlayFeature, string> = {
  court: 'Court',
  field: 'Field',
  'splash-pad': 'Splash Pad',
  'skate-park': 'Skate Park',
  'disc-golf': 'Disc Golf',
  'ice-rink': 'Ice Rink',
  pool: 'Pool',
  golf: 'Golf',
  'bike-course': 'Bike Course',
  sledding: 'Sledding',
  'downhill-skiing': 'Downhill Skiing',
  snowboarding: 'Snowboarding',
  'cross-country-skiing': 'Cross-Country Skiing',
}

export const LEARN_TYPE_LABELS: Record<LearnType, string> = {
  museum: 'Museum',
  nature: 'Nature',
  attraction: 'Attraction',
  'historic-site': 'Historic Site',
  zoo: 'Zoo',
  'national-monument': 'National Monument',
  'national-park': 'National Park',
  observatory: 'Observatory',
}

export const LEARN_FEATURE_LABELS: Record<LearnFeature, string> = {
  activities: 'Activities',
  exhibits: 'Exhibits',
  scenic: 'Scenic',
  tours: 'Tours',
  demonstrations: 'Demonstrations',
  'gift-shop': 'Gift Shop',
  cafe: 'Café',
  restaurant: 'Restaurant',
  workshops: 'Workshops',
  wildlife: 'Wildlife',
}

export const SHOP_TYPE_LABELS: Record<ShopType, string> = {
  toys: 'Toys',
  books: 'Books',
  clothing: 'Clothing',
  general: 'General',
  'outdoor-market': 'Outdoor Market',
  boutique: 'Boutique',
}

export const SHOP_FEATURE_LABELS: Record<ShopFeature, string> = {
  educational: 'Educational',
  activities: 'Activities',
  demonstrations: 'Demonstrations',
  'story-time': 'Story Time',
  art: 'Art',
  'board-games': 'Board Games',
  souvenirs: 'Souvenirs',
  'outdoor-gear': 'Outdoor Gear',
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
    id: 'learn',
    name: 'Learn',
    description: 'Museums, attractions, and educational experiences',
    icon: 'GraduationCap',
    color: 'bg-category-learn',
    slug: 'learn',
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
  'changing-tables',
  'parking',
  'dog-friendly',
]
export const ALL_ACCESSIBILITY: Accessibility[] = ['wheelchair', 'stroller']
export const ALL_SETTINGS: Setting[] = ['indoor', 'outdoor', 'both']
export const ALL_SHADE_COVERAGES: ShadeCoverage[] = ['none', 'partial', 'full']
export const ALL_PRICE_RANGES: PriceRange[] = ['free', '$', '$$', '$$$']
export const ALL_DIFFICULTIES: Difficulty[] = ['easy', 'moderate', 'hard']
export const ALL_SURFACES: Surface[] = ['paved', 'gravel', 'dirt', 'mixed']
export const ALL_HIKE_TYPES: HikeType[] = ['loop', 'out-and-back']
export const ALL_HIKE_FEATURES: HikeFeature[] = ['view', 'waterfall', 'lake', 'pond', 'wildlife', 'rock-formations']
export const ALL_MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'brunch', 'drinks', 'bakery', 'cafe', 'happy-hour']
export const ALL_EAT_FEATURES: EatFeature[] = [
  'kids-menu',
  'high-chairs',
  'outdoor-seating',
  'coloring',
  'play-area',
  'quick-service',
  'reservations',
  'entertainment',
]
export const ALL_PLAY_TYPES: PlayType[] = [
  'playground',
  'arcade',
  'open-space',
  'ice-rink',
  'pool',
  'snow-sports',
  'aerial',
  'bowling',
  'gardens',
]
export const ALL_PLAY_FEATURES: PlayFeature[] = [
  'court',
  'field',
  'splash-pad',
  'skate-park',
  'disc-golf',
  'ice-rink',
  'pool',
  'golf',
  'bike-course',
  'sledding',
  'downhill-skiing',
  'snowboarding',
  'cross-country-skiing',
]
export const ALL_LEARN_TYPES: LearnType[] = [
  'museum',
  'nature',
  'attraction',
  'historic-site',
  'zoo',
  'national-monument',
  'national-park',
  'observatory',
]
export const ALL_LEARN_FEATURES: LearnFeature[] = [
  'activities',
  'exhibits',
  'scenic',
  'tours',
  'demonstrations',
  'gift-shop',
  'cafe',
  'restaurant',
  'workshops',
  'wildlife',
]
export const ALL_SHOP_TYPES: ShopType[] = ['toys', 'books', 'clothing', 'general', 'outdoor-market', 'boutique']
export const ALL_SHOP_FEATURES: ShopFeature[] = [
  'educational',
  'activities',
  'demonstrations',
  'story-time',
  'art',
  'board-games',
  'souvenirs',
  'outdoor-gear',
]
