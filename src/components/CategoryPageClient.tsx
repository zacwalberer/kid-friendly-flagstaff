'use client'

import { useState, useMemo } from 'react'
import { CategoryHeader } from '@/components/layout'
import { ListingGrid, TopPick } from '@/components/listing'
import { FilterPanel } from '@/components/filters'
import { PageTransition } from '@/components/shared'
import {
  filterListings,
  filterHikeListings,
  filterEatListings,
  filterPlayListings,
  filterLearnListings,
  filterShopListings,
} from '@/utils/filterListings'
import {
  initialBaseFilterState,
  initialHikeFilterState,
  initialEatFilterState,
  initialPlayFilterState,
  initialLearnFilterState,
  initialShopFilterState,
} from '@/hooks/useFilters'
import type { Listing, CategoryInfo, HikeListing, EatListing, PlayListing, LearnListing, ShopListing } from '@/types'
import type { BaseFilterState, HikeFilterState, EatFilterState, PlayFilterState, LearnFilterState, ShopFilterState } from '@/types/filters'

interface CategoryPageClientProps {
  category: CategoryInfo
  listings: Listing[]
  topPick?: Listing
}

export function CategoryPageClient({
  category,
  listings,
  topPick,
}: CategoryPageClientProps) {
  // Get the appropriate initial filter state based on category
  const getInitialFilters = () => {
    switch (category.id) {
      case 'hike':
        return initialHikeFilterState
      case 'eat':
        return initialEatFilterState
      case 'play':
        return initialPlayFilterState
      case 'learn':
        return initialLearnFilterState
      case 'shop':
        return initialShopFilterState
      default:
        return initialBaseFilterState
    }
  }

  const [filters, setFilters] = useState<
    BaseFilterState | HikeFilterState | EatFilterState | PlayFilterState | LearnFilterState | ShopFilterState
  >(getInitialFilters())

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handleReset = () => {
    setFilters(getInitialFilters())
  }

  // Filter listings based on current filters and category
  const filteredListings = useMemo(() => {
    switch (category.id) {
      case 'hike':
        return filterHikeListings(listings as HikeListing[], filters as HikeFilterState)
      case 'eat':
        return filterEatListings(listings as EatListing[], filters as EatFilterState)
      case 'play':
        return filterPlayListings(listings as PlayListing[], filters as PlayFilterState)
      case 'learn':
        return filterLearnListings(listings as LearnListing[], filters as LearnFilterState)
      case 'shop':
        return filterShopListings(listings as ShopListing[], filters as ShopFilterState)
      default:
        return filterListings(listings, filters)
    }
  }, [listings, filters, category.id])

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <CategoryHeader category={category} listingCount={filteredListings.length} />

        {topPick && <TopPick listing={topPick} />}

        <FilterPanel
          category={category.id}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />

        <ListingGrid
          listings={filteredListings}
          emptyMessage={`No ${category.name.toLowerCase()} listings found matching your filters.`}
        />
      </div>
    </PageTransition>
  )
}
