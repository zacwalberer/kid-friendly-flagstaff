import type {
  Listing,
  HikeListing,
  EatListing,
  PlayListing,
  LearnListing,
  ShopListing,
} from '@/types/listing'
import type {
  BaseFilterState,
  HikeFilterState,
  EatFilterState,
  PlayFilterState,
  LearnFilterState,
  ShopFilterState,
} from '@/types/filters'

function matchesBaseFilters(listing: Listing, filters: BaseFilterState): boolean {
  // Search query filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    const searchableText = `${listing.name} ${listing.description} ${listing.shortDescription}`.toLowerCase()
    if (!searchableText.includes(query)) {
      return false
    }
  }

  // Age range filter - listing must support at least one selected age
  if (filters.ageRanges.length > 0) {
    const hasMatchingAge = filters.ageRanges.some((age) => listing.ageRanges.includes(age))
    if (!hasMatchingAge) {
      return false
    }
  }

  // Weather filter - listing must support at least one selected weather
  if (filters.weather.length > 0) {
    const hasMatchingWeather = filters.weather.some((w) => listing.weather.includes(w))
    if (!hasMatchingWeather) {
      return false
    }
  }

  // Amenities filter - listing must have ALL selected amenities
  if (filters.amenities.length > 0) {
    const hasAllAmenities = filters.amenities.every((a) => listing.amenities.includes(a))
    if (!hasAllAmenities) {
      return false
    }
  }

  // Accessibility filter - listing must have ALL selected accessibility options
  if (filters.accessibility.length > 0) {
    const listingAccessibility = listing.accessibility || []
    const hasAllAccessibility = filters.accessibility.every((a) => listingAccessibility.includes(a))
    if (!hasAllAccessibility) {
      return false
    }
  }

  return true
}

export function filterListings<T extends Listing>(
  listings: T[],
  filters: BaseFilterState
): T[] {
  return listings.filter((listing) => matchesBaseFilters(listing, filters))
}

export function filterHikeListings(
  listings: HikeListing[],
  filters: HikeFilterState
): HikeListing[] {
  return listings.filter((listing) => {
    if (!matchesBaseFilters(listing, filters)) return false

    // Difficulty filter
    if (filters.difficulty.length > 0 && !filters.difficulty.includes(listing.difficulty)) {
      return false
    }

    // Surface filter
    if (filters.surface.length > 0 && !filters.surface.includes(listing.surface)) {
      return false
    }

    // Hike type filter
    if (filters.hikeType !== null && listing.hikeType !== filters.hikeType) {
      return false
    }

    // Shade coverage filter
    if (filters.shadeCoverage !== null && listing.shadeCoverage !== filters.shadeCoverage) {
      return false
    }

    return true
  })
}

export function filterEatListings(
  listings: EatListing[],
  filters: EatFilterState
): EatListing[] {
  return listings.filter((listing) => {
    if (!matchesBaseFilters(listing, filters)) return false

    // Meal type filter - listing must offer at least one selected meal type
    if (filters.mealTypes.length > 0) {
      const hasMatchingMealType = filters.mealTypes.some((mt) => listing.mealTypes.includes(mt))
      if (!hasMatchingMealType) return false
    }

    // Features filter - listing must have all selected features
    if (filters.features.length > 0) {
      const hasAllFeatures = filters.features.every((f) => listing.features.includes(f))
      if (!hasAllFeatures) return false
    }

    return true
  })
}

export function filterPlayListings(
  listings: PlayListing[],
  filters: PlayFilterState
): PlayListing[] {
  return listings.filter((listing) => {
    if (!matchesBaseFilters(listing, filters)) return false

    // Fenced area filter
    if (filters.hasFencedArea !== null && listing.hasFencedArea !== filters.hasFencedArea) {
      return false
    }

    // Setting filter
    if (filters.setting !== null) {
      if (filters.setting === 'both') {
        if (listing.setting !== 'both') return false
      } else {
        if (listing.setting !== filters.setting && listing.setting !== 'both') return false
      }
    }

    // Shade coverage filter
    if (filters.shadeCoverage !== null && listing.shadeCoverage !== filters.shadeCoverage) {
      return false
    }

    // Features filter
    if (filters.features.length > 0) {
      const listingFeatures = listing.features || []
      const hasAllFeatures = filters.features.every((f) => listingFeatures.includes(f))
      if (!hasAllFeatures) return false
    }

    return true
  })
}

export function filterLearnListings(
  listings: LearnListing[],
  filters: LearnFilterState
): LearnListing[] {
  return listings.filter((listing) => {
    if (!matchesBaseFilters(listing, filters)) return false

    // Admission required filter
    if (
      filters.admissionRequired !== null &&
      listing.admissionRequired !== filters.admissionRequired
    ) {
      return false
    }

    // Setting filter
    if (filters.setting !== null) {
      if (filters.setting === 'both') {
        if (listing.setting !== 'both') return false
      } else {
        if (listing.setting !== filters.setting && listing.setting !== 'both') return false
      }
    }

    // Features filter
    if (filters.features.length > 0) {
      const listingFeatures = listing.features || []
      const hasAllFeatures = filters.features.every((f) => listingFeatures.includes(f))
      if (!hasAllFeatures) return false
    }

    return true
  })
}

export function filterShopListings(
  listings: ShopListing[],
  filters: ShopFilterState
): ShopListing[] {
  return listings.filter((listing) => {
    if (!matchesBaseFilters(listing, filters)) return false

    // Features filter
    if (filters.features.length > 0) {
      const listingFeatures = listing.features || []
      const hasAllFeatures = filters.features.every((f) => listingFeatures.includes(f))
      if (!hasAllFeatures) return false
    }

    return true
  })
}

// Count active filters for display
export function countActiveFilters(filters: BaseFilterState): number {
  let count = 0
  if (filters.ageRanges.length > 0) count++
  if (filters.weather.length > 0) count++
  if (filters.amenities.length > 0) count++
  if (filters.searchQuery) count++
  return count
}
