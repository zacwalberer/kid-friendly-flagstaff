import Airtable from 'airtable'
import type {
  Activity,
  PlayActivity,
  HikeActivity,
  EatActivity,
  LearnActivity,
  ShopActivity,
  Category,
  AgeRange,
  Weather,
  Amenity,
  Accessibility,
  Difficulty,
  Surface,
  MealType,
  EatFeature,
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

// Airtable field names mapping to our schema
// These should match exactly what's in your Airtable base
interface AirtableActivityRecord {
  // Base fields
  id?: string
  slug?: string
  name?: string
  category?: Category
  description?: string
  shortDescription?: string
  address?: string
  phone?: string
  website?: string
  hours?: string
  priceRange?: PriceRange[]
  kidFriendlinessScore?: number
  ageRanges?: AgeRange[]
  weather?: Weather[]
  amenities?: Amenity[]
  accessibility?: Accessibility[]
  images?: { url: string }[]
  isTopPick?: boolean
  topPickReason?: string
  tips?: string
  latitude?: number
  longitude?: number
  lastUpdated?: string
  status?: 'Draft' | 'Published' | 'Archived'

  // Play-specific
  playType?: PlayType
  setting?: Setting
  hasFencedArea?: boolean
  shadeCoverage?: ShadeCoverage
  hasWaterFountain?: boolean
  hasPicnicTable?: boolean
  playFeatures?: PlayFeature[]

  // Hike-specific
  difficulty?: Difficulty
  distance?: string
  elevationGain?: string
  surface?: Surface
  hikeType?: HikeType
  trailheadParking?: string
  bestSeason?: string[]
  hikeFeatures?: HikeFeature[]
  duration?: string

  // Eat-specific
  cuisine?: string
  mealTypes?: MealType[]
  eatFeatures?: EatFeature[]
  noiseLevel?: 'quiet' | 'moderate' | 'loud'

  // Learn-specific
  learnType?: LearnType
  admissionRequired?: boolean
  advanceBooking?: boolean
  learnFeatures?: LearnFeature[]

  // Shop-specific
  shopType?: ShopType
  shopFeatures?: ShopFeature[]
}

// Initialize Airtable
function getAirtableBase() {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error(
      'Missing Airtable configuration. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.'
    )
  }

  const airtable = new Airtable({ apiKey })
  return airtable.base(baseId)
}

// Parse comma-separated string into array
function parseStringToArray(value: string | undefined): string[] {
  if (!value) return []
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

// Transform Airtable record to our Activity type
function transformRecord(
  recordId: string,
  fields: AirtableActivityRecord
): Activity | null {
  // Skip unpublished records
  if (fields.status && fields.status !== 'Published') {
    return null
  }

  // Validate required fields
  if (!fields.name || !fields.slug || !fields.category) {
    console.warn(`Skipping record ${recordId}: missing required fields`)
    return null
  }

  // Build base activity object
  const baseActivity = {
    id: fields.id || `${fields.category}-${fields.slug}`,
    slug: fields.slug,
    name: fields.name,
    category: fields.category,
    description: fields.description || '',
    shortDescription: fields.shortDescription || '',
    address: fields.address || '',
    phone: fields.phone,
    website: fields.website,
    hours: fields.hours,
    priceRange: fields.priceRange,
    kidFriendlinessScore: (fields.kidFriendlinessScore || 3) as 1 | 2 | 3 | 4 | 5,
    ageRanges: fields.ageRanges || [],
    weather: fields.weather || [],
    amenities: fields.amenities || [],
    accessibility: fields.accessibility,
    images: fields.images?.map((img) => img.url) || [],
    isTopPick: fields.isTopPick || false,
    topPickReason: fields.topPickReason,
    tips: fields.tips ? parseStringToArray(fields.tips) : undefined,
    coordinates:
      fields.latitude && fields.longitude
        ? { lat: fields.latitude, lng: fields.longitude }
        : undefined,
    lastUpdated: fields.lastUpdated || new Date().toISOString().split('T')[0],
  }

  // Build category-specific activity
  switch (fields.category) {
    case 'play':
      return {
        ...baseActivity,
        category: 'play',
        playType: fields.playType || 'playground',
        setting: fields.setting || 'outdoor',
        hasFencedArea: fields.hasFencedArea,
        shadeCoverage: fields.shadeCoverage,
        hasWaterFountain: fields.hasWaterFountain,
        hasPicnicTable: fields.hasPicnicTable,
        features: fields.playFeatures,
      } as PlayActivity

    case 'hike':
      return {
        ...baseActivity,
        category: 'hike',
        difficulty: fields.difficulty || 'easy',
        distance: fields.distance || '',
        elevationGain: fields.elevationGain,
        surface: fields.surface || 'mixed',
        hikeType: fields.hikeType || 'loop',
        trailheadParking: fields.trailheadParking,
        bestSeason: fields.bestSeason,
        features: fields.hikeFeatures,
        shadeCoverage: fields.shadeCoverage,
        duration: fields.duration,
        hasWaterFountain: fields.hasWaterFountain,
        hasPicnicTable: fields.hasPicnicTable,
      } as HikeActivity

    case 'eat':
      return {
        ...baseActivity,
        category: 'eat',
        cuisine: fields.cuisine || '',
        mealTypes: fields.mealTypes || [],
        features: fields.eatFeatures || [],
        noiseLevel: fields.noiseLevel,
      } as EatActivity

    case 'learn':
      return {
        ...baseActivity,
        category: 'learn',
        learnType: fields.learnType || 'attraction',
        setting: fields.setting || 'indoor',
        admissionRequired: fields.admissionRequired || false,
        advanceBooking: fields.advanceBooking,
        features: fields.learnFeatures,
      } as LearnActivity

    case 'shop':
      return {
        ...baseActivity,
        category: 'shop',
        shopType: fields.shopType || 'general',
        features: fields.shopFeatures,
      } as ShopActivity

    default:
      console.warn(`Unknown category: ${fields.category}`)
      return null
  }
}

// Fetch all activities from Airtable
export async function fetchActivitiesFromAirtable(): Promise<Activity[]> {
  const base = getAirtableBase()
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Listings'

  const activities: Activity[] = []

  return new Promise((resolve, reject) => {
    base(tableName)
      .select({
        // Only fetch published records
        filterByFormula: "OR({status} = 'Published', {status} = '')",
        // Sort by category then name
        sort: [
          { field: 'category', direction: 'asc' },
          { field: 'name', direction: 'asc' },
        ],
      })
      .eachPage(
        (records, fetchNextPage) => {
          for (const record of records) {
            const activity = transformRecord(
              record.id,
              record.fields as unknown as AirtableActivityRecord
            )
            if (activity) {
              activities.push(activity)
            }
          }
          fetchNextPage()
        },
        (err) => {
          if (err) {
            console.error('Error fetching from Airtable:', err)
            reject(err)
          } else {
            resolve(activities)
          }
        }
      )
  })
}

// Fetch activities by category from Airtable
export async function fetchActivitiesByCategoryFromAirtable(
  category: Category
): Promise<Activity[]> {
  const base = getAirtableBase()
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Listings'

  const activities: Activity[] = []

  return new Promise((resolve, reject) => {
    base(tableName)
      .select({
        filterByFormula: `AND({category} = '${category}', OR({status} = 'Published', {status} = ''))`,
        sort: [{ field: 'name', direction: 'asc' }],
      })
      .eachPage(
        (records, fetchNextPage) => {
          for (const record of records) {
            const activity = transformRecord(
              record.id,
              record.fields as unknown as AirtableActivityRecord
            )
            if (activity) {
              activities.push(activity)
            }
          }
          fetchNextPage()
        },
        (err) => {
          if (err) {
            console.error('Error fetching from Airtable:', err)
            reject(err)
          } else {
            resolve(activities)
          }
        }
      )
  })
}

// Check if Airtable is configured
export function isAirtableConfigured(): boolean {
  return Boolean(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID)
}
