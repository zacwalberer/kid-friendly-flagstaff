'use client'

import { useState, useMemo } from 'react'
import { CategoryHeader } from '@/components/layout'
import { ActivityGrid, TopPick } from '@/components/activity'
import { FilterPanel } from '@/components/filters'
import { PageTransition } from '@/components/shared'
import {
  filterActivities,
  filterHikeActivities,
  filterEatActivities,
  filterPlayActivities,
  filterLearnActivities,
  filterShopActivities,
} from '@/utils/filterActivities'
import {
  initialBaseFilterState,
  initialHikeFilterState,
  initialEatFilterState,
  initialPlayFilterState,
  initialLearnFilterState,
  initialShopFilterState,
} from '@/hooks/useFilters'
import type { Activity, CategoryInfo, HikeActivity, EatActivity, PlayActivity, LearnActivity, ShopActivity } from '@/types'
import type { BaseFilterState, HikeFilterState, EatFilterState, PlayFilterState, LearnFilterState, ShopFilterState } from '@/types/filters'

interface CategoryPageClientProps {
  category: CategoryInfo
  activities: Activity[]
  topPick?: Activity
}

export function CategoryPageClient({
  category,
  activities,
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

  // Filter activities based on current filters and category
  const filteredActivities = useMemo(() => {
    switch (category.id) {
      case 'hike':
        return filterHikeActivities(activities as HikeActivity[], filters as HikeFilterState)
      case 'eat':
        return filterEatActivities(activities as EatActivity[], filters as EatFilterState)
      case 'play':
        return filterPlayActivities(activities as PlayActivity[], filters as PlayFilterState)
      case 'learn':
        return filterLearnActivities(activities as LearnActivity[], filters as LearnFilterState)
      case 'shop':
        return filterShopActivities(activities as ShopActivity[], filters as ShopFilterState)
      default:
        return filterActivities(activities, filters)
    }
  }, [activities, filters, category.id])

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <CategoryHeader category={category} activityCount={filteredActivities.length} />

        {topPick && <TopPick activity={topPick} />}

        <FilterPanel
          category={category.id}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />

        <ActivityGrid
          activities={filteredActivities}
          emptyMessage={`No ${category.name.toLowerCase()} activities found matching your filters.`}
        />
      </div>
    </PageTransition>
  )
}
