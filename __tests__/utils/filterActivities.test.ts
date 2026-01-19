import { describe, it, expect } from 'vitest'
import { filterActivities, countActiveFilters } from '@/utils/filterActivities'
import type { PlayActivity } from '@/types'
import type { BaseFilterState } from '@/types/filters'

const mockActivity: PlayActivity = {
  id: 'test-1',
  slug: 'test-park',
  name: 'Test Park',
  category: 'play',
  description: 'A test playground',
  shortDescription: 'Test playground',
  address: '123 Test St',
  kidFriendlinessScore: 5,
  ageRanges: ['toddler', 'preschool', 'elementary'],
  weather: ['sunny', 'cold'],
  amenities: ['restrooms', 'parking', 'shade'],
  images: [],
  lastUpdated: '2024-01-01',
  playType: 'playground',
  setting: 'outdoor',
}

const emptyFilters: BaseFilterState = {
  ageRanges: [],
  weather: [],
  amenities: [],
  accessibility: [],
  searchQuery: '',
}

describe('filterActivities', () => {
  it('returns all activities when no filters are applied', () => {
    const activities = [mockActivity]
    const result = filterActivities(activities, emptyFilters)
    expect(result).toHaveLength(1)
  })

  it('filters by age range', () => {
    const activities = [mockActivity]
    const filters: BaseFilterState = {
      ...emptyFilters,
      ageRanges: ['toddler'],
    }
    const result = filterActivities(activities, filters)
    expect(result).toHaveLength(1)
  })

  it('excludes activities that do not match age range', () => {
    const activities = [mockActivity]
    const filters: BaseFilterState = {
      ...emptyFilters,
      ageRanges: ['baby'], // mockActivity doesn't have 'baby'
    }
    const result = filterActivities(activities, filters)
    expect(result).toHaveLength(0)
  })

  it('filters by weather', () => {
    const activities = [mockActivity]
    const filters: BaseFilterState = {
      ...emptyFilters,
      weather: ['sunny'],
    }
    const result = filterActivities(activities, filters)
    expect(result).toHaveLength(1)
  })

  it('filters by amenities - must have ALL selected amenities', () => {
    const activities = [mockActivity]
    const filters: BaseFilterState = {
      ...emptyFilters,
      amenities: ['restrooms', 'parking'],
    }
    const result = filterActivities(activities, filters)
    expect(result).toHaveLength(1)
  })

  it('excludes activities missing required amenities', () => {
    const activities = [mockActivity]
    const filters: BaseFilterState = {
      ...emptyFilters,
      amenities: ['dog-friendly'], // mockActivity doesn't have this
    }
    const result = filterActivities(activities, filters)
    expect(result).toHaveLength(0)
  })

  it('filters by search query', () => {
    const activities = [mockActivity]
    const filters: BaseFilterState = {
      ...emptyFilters,
      searchQuery: 'Test',
    }
    const result = filterActivities(activities, filters)
    expect(result).toHaveLength(1)
  })

  it('search query is case insensitive', () => {
    const activities = [mockActivity]
    const filters: BaseFilterState = {
      ...emptyFilters,
      searchQuery: 'test',
    }
    const result = filterActivities(activities, filters)
    expect(result).toHaveLength(1)
  })
})

describe('countActiveFilters', () => {
  it('returns 0 for empty filters', () => {
    expect(countActiveFilters(emptyFilters)).toBe(0)
  })

  it('counts age range filter', () => {
    const filters: BaseFilterState = {
      ...emptyFilters,
      ageRanges: ['toddler'],
    }
    expect(countActiveFilters(filters)).toBe(1)
  })

  it('counts multiple filter types', () => {
    const filters: BaseFilterState = {
      ...emptyFilters,
      ageRanges: ['toddler'],
      weather: ['sunny'],
      searchQuery: 'test',
    }
    expect(countActiveFilters(filters)).toBe(3)
  })
})
