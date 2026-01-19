/**
 * Format a distance string for display
 * Handles various input formats like "1.5 miles", "2.3 mi", "0.5"
 */
export function formatDistance(distance: string): string {
  // If it already has units, return as-is
  if (distance.includes('mile') || distance.includes('mi')) {
    return distance
  }

  // Try to parse as a number and add "miles"
  const num = parseFloat(distance)
  if (!isNaN(num)) {
    return num === 1 ? '1 mile' : `${num} miles`
  }

  // Return original if we can't parse it
  return distance
}

/**
 * Parse distance to numeric miles for comparison/sorting
 */
export function parseDistanceToMiles(distance: string): number {
  // Remove "miles" or "mi" and trim
  const cleaned = distance.replace(/\s*(miles?|mi)\s*/i, '').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

/**
 * Format elevation gain for display
 */
export function formatElevation(elevation: string): string {
  // If it already has units, return as-is
  if (elevation.includes('ft') || elevation.includes('feet')) {
    return elevation
  }

  // Try to parse as a number and add "ft"
  const num = parseFloat(elevation)
  if (!isNaN(num)) {
    return `${num.toLocaleString()} ft`
  }

  return elevation
}

/**
 * Format duration for display
 */
export function formatDuration(duration: string): string {
  // If it already looks formatted, return as-is
  if (duration.includes('hour') || duration.includes('min') || duration.includes('hr')) {
    return duration
  }

  // Try to parse as hours
  const num = parseFloat(duration)
  if (!isNaN(num)) {
    if (num < 1) {
      return `${Math.round(num * 60)} min`
    }
    return num === 1 ? '1 hour' : `${num} hours`
  }

  return duration
}
