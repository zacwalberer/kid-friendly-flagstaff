import type {
  Activity,
  HikeActivity,
  EatActivity,
  PlayActivity,
  LearnActivity,
  ShopActivity,
} from '@/types/activity'
import type {
  BaseFilterState,
  HikeFilterState,
  EatFilterState,
  PlayFilterState,
  LearnFilterState,
  ShopFilterState,
} from '@/types/filters'

function matchesBaseFilters(activity: Activity, filters: BaseFilterState): boolean {
  // Search query filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    const searchableText = `${activity.name} ${activity.description} ${activity.shortDescription}`.toLowerCase()
    if (!searchableText.includes(query)) {
      return false
    }
  }

  // Age range filter - activity must support at least one selected age
  if (filters.ageRanges.length > 0) {
    const hasMatchingAge = filters.ageRanges.some((age) => activity.ageRanges.includes(age))
    if (!hasMatchingAge) {
      return false
    }
  }

  // Weather filter - activity must support at least one selected weather
  if (filters.weather.length > 0) {
    const hasMatchingWeather = filters.weather.some((w) => activity.weather.includes(w))
    if (!hasMatchingWeather) {
      return false
    }
  }

  // Amenities filter - activity must have ALL selected amenities
  if (filters.amenities.length > 0) {
    const hasAllAmenities = filters.amenities.every((a) => activity.amenities.includes(a))
    if (!hasAllAmenities) {
      return false
    }
  }

  // Accessibility filter - activity must have ALL selected accessibility options
  if (filters.accessibility.length > 0) {
    const activityAccessibility = activity.accessibility || []
    const hasAllAccessibility = filters.accessibility.every((a) => activityAccessibility.includes(a))
    if (!hasAllAccessibility) {
      return false
    }
  }

  return true
}

export function filterActivities<T extends Activity>(
  activities: T[],
  filters: BaseFilterState
): T[] {
  return activities.filter((activity) => matchesBaseFilters(activity, filters))
}

export function filterHikeActivities(
  activities: HikeActivity[],
  filters: HikeFilterState
): HikeActivity[] {
  return activities.filter((activity) => {
    if (!matchesBaseFilters(activity, filters)) return false

    // Difficulty filter
    if (filters.difficulty.length > 0 && !filters.difficulty.includes(activity.difficulty)) {
      return false
    }

    // Surface filter
    if (filters.surface.length > 0 && !filters.surface.includes(activity.surface)) {
      return false
    }

    // Hike type filter
    if (filters.hikeType !== null && activity.hikeType !== filters.hikeType) {
      return false
    }

    // Shade coverage filter
    if (filters.shadeCoverage !== null && activity.shadeCoverage !== filters.shadeCoverage) {
      return false
    }

    return true
  })
}

export function filterEatActivities(
  activities: EatActivity[],
  filters: EatFilterState
): EatActivity[] {
  return activities.filter((activity) => {
    if (!matchesBaseFilters(activity, filters)) return false

    // Meal type filter - activity must offer at least one selected meal type
    if (filters.mealTypes.length > 0) {
      const hasMatchingMealType = filters.mealTypes.some((mt) => activity.mealTypes.includes(mt))
      if (!hasMatchingMealType) return false
    }

    // Features filter - activity must have all selected features
    if (filters.features.length > 0) {
      const hasAllFeatures = filters.features.every((f) => activity.features.includes(f))
      if (!hasAllFeatures) return false
    }

    return true
  })
}

export function filterPlayActivities(
  activities: PlayActivity[],
  filters: PlayFilterState
): PlayActivity[] {
  return activities.filter((activity) => {
    if (!matchesBaseFilters(activity, filters)) return false

    // Fenced area filter
    if (filters.hasFencedArea !== null && activity.hasFencedArea !== filters.hasFencedArea) {
      return false
    }

    // Setting filter
    if (filters.setting !== null) {
      if (filters.setting === 'both') {
        if (activity.setting !== 'both') return false
      } else {
        if (activity.setting !== filters.setting && activity.setting !== 'both') return false
      }
    }

    // Shade coverage filter
    if (filters.shadeCoverage !== null && activity.shadeCoverage !== filters.shadeCoverage) {
      return false
    }

    // Features filter
    if (filters.features.length > 0) {
      const activityFeatures = activity.features || []
      const hasAllFeatures = filters.features.every((f) => activityFeatures.includes(f))
      if (!hasAllFeatures) return false
    }

    return true
  })
}

export function filterLearnActivities(
  activities: LearnActivity[],
  filters: LearnFilterState
): LearnActivity[] {
  return activities.filter((activity) => {
    if (!matchesBaseFilters(activity, filters)) return false

    // Admission required filter
    if (
      filters.admissionRequired !== null &&
      activity.admissionRequired !== filters.admissionRequired
    ) {
      return false
    }

    // Setting filter
    if (filters.setting !== null) {
      if (filters.setting === 'both') {
        if (activity.setting !== 'both') return false
      } else {
        if (activity.setting !== filters.setting && activity.setting !== 'both') return false
      }
    }

    // Features filter
    if (filters.features.length > 0) {
      const activityFeatures = activity.features || []
      const hasAllFeatures = filters.features.every((f) => activityFeatures.includes(f))
      if (!hasAllFeatures) return false
    }

    return true
  })
}

export function filterShopActivities(
  activities: ShopActivity[],
  filters: ShopFilterState
): ShopActivity[] {
  return activities.filter((activity) => {
    if (!matchesBaseFilters(activity, filters)) return false

    // Features filter
    if (filters.features.length > 0) {
      const activityFeatures = activity.features || []
      const hasAllFeatures = filters.features.every((f) => activityFeatures.includes(f))
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
