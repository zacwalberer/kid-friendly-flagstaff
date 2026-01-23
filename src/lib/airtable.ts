import Airtable from 'airtable'
import type {
  Activity,
  PlayActivity,
  HikeActivity,
  EatActivity,
  ExploreActivity,
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
  priceRange?: string
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
  playType?: 'playground' | 'indoor-play' | 'sports' | 'splash-pad' | 'arcade'
  setting?: Setting
  hasFencedArea?: boolean
  ageGroupSections?: string
  playFeatures?: string

  // Hike-specific
  difficulty?: Difficulty
  distance?: string
  elevationGain?: string
  surface?: Surface
  isLoop?: boolean
  trailheadParking?: string
  bestSeason?: string[]
  hikeFeatures?: string
  shadeCoverage?: ShadeCoverage
  duration?: string

  // Eat-specific
  cuisine?: string
  mealTypes?: MealType[]
  eatFeatures?: EatFeature[]
  averageMealTime?: string
  noiseLevel?: 'quiet' | 'moderate' | 'loud'
  changingTables?: boolean

  // Explore-specific
  exploreType?: 'museum' | 'nature' | 'attraction' | 'historic-site' | 'adventure'
  admissionRequired?: boolean
  advanceBooking?: boolean
  exploreFeatures?: string

  // Shop-specific
  shopType?: 'toys' | 'books' | 'clothing' | 'resale' | 'general'
  hasPlayArea?: boolean
  kidsFocused?: boolean
  shopFeatures?: string
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
        ageGroupSections: fields.ageGroupSections
          ? parseStringToArray(fields.ageGroupSections)
          : undefined,
        features: fields.playFeatures
          ? parseStringToArray(fields.playFeatures)
          : undefined,
      } as PlayActivity

    case 'hike':
      return {
        ...baseActivity,
        category: 'hike',
        difficulty: fields.difficulty || 'easy',
        distance: fields.distance || '',
        elevationGain: fields.elevationGain,
        surface: fields.surface || 'mixed',
        isLoop: fields.isLoop || false,
        trailheadParking: fields.trailheadParking,
        bestSeason: fields.bestSeason,
        features: fields.hikeFeatures
          ? parseStringToArray(fields.hikeFeatures)
          : undefined,
        shadeCoverage: fields.shadeCoverage,
        duration: fields.duration,
      } as HikeActivity

    case 'eat':
      return {
        ...baseActivity,
        category: 'eat',
        cuisine: fields.cuisine || '',
        mealTypes: fields.mealTypes || [],
        features: fields.eatFeatures || [],
        averageMealTime: fields.averageMealTime,
        noiseLevel: fields.noiseLevel,
        changingTables: fields.changingTables,
      } as EatActivity

    case 'explore':
      return {
        ...baseActivity,
        category: 'explore',
        exploreType: fields.exploreType || 'attraction',
        setting: fields.setting || 'indoor',
        admissionRequired: fields.admissionRequired || false,
        advanceBooking: fields.advanceBooking,
        features: fields.exploreFeatures
          ? parseStringToArray(fields.exploreFeatures)
          : undefined,
      } as ExploreActivity

    case 'shop':
      return {
        ...baseActivity,
        category: 'shop',
        shopType: fields.shopType || 'general',
        hasPlayArea: fields.hasPlayArea,
        kidsFocused: fields.kidsFocused || false,
        features: fields.shopFeatures
          ? parseStringToArray(fields.shopFeatures)
          : undefined,
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
