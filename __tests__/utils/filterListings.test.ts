import { describe, it, expect } from 'vitest'
import { filterListings, countActiveFilters } from '@/utils/filterListings'
import type { PlayListing } from '@/types'
import type { BaseFilterState } from '@/types/filters'

const mockListing: PlayListing = {
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
  amenities: ['restrooms', 'parking'],
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

describe('filterListings', () => {
  it('returns all listings when no filters are applied', () => {
    const listings = [mockListing]
    const result = filterListings(listings, emptyFilters)
    expect(result).toHaveLength(1)
  })

  it('filters by age range', () => {
    const listings = [mockListing]
    const filters: BaseFilterState = {
      ...emptyFilters,
      ageRanges: ['toddler'],
    }
    const result = filterListings(listings, filters)
    expect(result).toHaveLength(1)
  })

  it('excludes listings that do not match age range', () => {
    const listings = [mockListing]
    const filters: BaseFilterState = {
      ...emptyFilters,
      ageRanges: ['baby'], // mockListing doesn't have 'baby'
    }
    const result = filterListings(listings, filters)
    expect(result).toHaveLength(0)
  })

  it('filters by weather', () => {
    const listings = [mockListing]
    const filters: BaseFilterState = {
      ...emptyFilters,
      weather: ['sunny'],
    }
    const result = filterListings(listings, filters)
    expect(result).toHaveLength(1)
  })

  it('filters by amenities - must have ALL selected amenities', () => {
    const listings = [mockListing]
    const filters: BaseFilterState = {
      ...emptyFilters,
      amenities: ['restrooms', 'parking'],
    }
    const result = filterListings(listings, filters)
    expect(result).toHaveLength(1)
  })

  it('excludes listings missing required amenities', () => {
    const listings = [mockListing]
    const filters: BaseFilterState = {
      ...emptyFilters,
      amenities: ['dog-friendly'], // mockListing doesn't have this
    }
    const result = filterListings(listings, filters)
    expect(result).toHaveLength(0)
  })

  it('filters by search query', () => {
    const listings = [mockListing]
    const filters: BaseFilterState = {
      ...emptyFilters,
      searchQuery: 'Test',
    }
    const result = filterListings(listings, filters)
    expect(result).toHaveLength(1)
  })

  it('search query is case insensitive', () => {
    const listings = [mockListing]
    const filters: BaseFilterState = {
      ...emptyFilters,
      searchQuery: 'test',
    }
    const result = filterListings(listings, filters)
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
