'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AgeRangePills } from './AgeRangePills'
import { WeatherFilter } from './WeatherFilter'
import { AmenityFilter } from './AmenityFilter'
import { HikeFilters } from './HikeFilters'
import { EatFilters } from './EatFilters'
import { filterPanelVariants } from '@/lib/animations'
import { countActiveFilters } from '@/utils/filterActivities'
import type { Category, AgeRange, Weather, Amenity, Difficulty, Surface, MealType, EatFeature } from '@/types'
import type { BaseFilterState, HikeFilterState, EatFilterState } from '@/types/filters'

interface FilterPanelProps {
  category: Category
  filters: BaseFilterState | HikeFilterState | EatFilterState
  onFilterChange: (filters: BaseFilterState | HikeFilterState | EatFilterState) => void
  onReset: () => void
}

export function FilterPanel({
  category,
  filters,
  onFilterChange,
  onReset,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeCount = countActiveFilters(filters)

  const handleAgeToggle = (age: AgeRange) => {
    const newAges = filters.ageRanges.includes(age)
      ? filters.ageRanges.filter((a) => a !== age)
      : [...filters.ageRanges, age]
    onFilterChange({ ...filters, ageRanges: newAges })
  }

  const handleWeatherToggle = (weather: Weather) => {
    const newWeather = filters.weather.includes(weather)
      ? filters.weather.filter((w) => w !== weather)
      : [...filters.weather, weather]
    onFilterChange({ ...filters, weather: newWeather })
  }

  const handleAmenityToggle = (amenity: Amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    onFilterChange({ ...filters, amenities: newAmenities })
  }

  const handleSearchChange = (query: string) => {
    onFilterChange({ ...filters, searchQuery: query })
  }

  // Hike-specific handlers
  const handleDifficultyToggle = (difficulty: Difficulty) => {
    if (category !== 'hike') return
    const hikeFilters = filters as HikeFilterState
    const newDifficulty = hikeFilters.difficulty.includes(difficulty)
      ? hikeFilters.difficulty.filter((d) => d !== difficulty)
      : [...hikeFilters.difficulty, difficulty]
    onFilterChange({ ...hikeFilters, difficulty: newDifficulty })
  }

  const handleSurfaceToggle = (surface: Surface) => {
    if (category !== 'hike') return
    const hikeFilters = filters as HikeFilterState
    const newSurface = hikeFilters.surface.includes(surface)
      ? hikeFilters.surface.filter((s) => s !== surface)
      : [...hikeFilters.surface, surface]
    onFilterChange({ ...hikeFilters, surface: newSurface })
  }

  const handleStrollerFriendlyChange = (value: boolean | null) => {
    if (category !== 'hike') return
    onFilterChange({ ...(filters as HikeFilterState), strollerFriendly: value })
  }

  const handleIsLoopChange = (value: boolean | null) => {
    if (category !== 'hike') return
    onFilterChange({ ...(filters as HikeFilterState), isLoop: value })
  }

  // Eat-specific handlers
  const handleMealTypeToggle = (mealType: MealType) => {
    if (category !== 'eat') return
    const eatFilters = filters as EatFilterState
    const newMealTypes = eatFilters.mealTypes.includes(mealType)
      ? eatFilters.mealTypes.filter((m) => m !== mealType)
      : [...eatFilters.mealTypes, mealType]
    onFilterChange({ ...eatFilters, mealTypes: newMealTypes })
  }

  const handleEatFeatureToggle = (feature: EatFeature) => {
    if (category !== 'eat') return
    const eatFilters = filters as EatFilterState
    const newFeatures = eatFilters.features.includes(feature)
      ? eatFilters.features.filter((f) => f !== feature)
      : [...eatFilters.features, feature]
    onFilterChange({ ...eatFilters, features: newFeatures })
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search activities..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Separator />

      {/* Age Range */}
      <AgeRangePills selected={filters.ageRanges} onToggle={handleAgeToggle} />

      <Separator />

      {/* Weather */}
      <WeatherFilter selected={filters.weather} onToggle={handleWeatherToggle} />

      <Separator />

      {/* Amenities */}
      <AmenityFilter selected={filters.amenities} onToggle={handleAmenityToggle} />

      {/* Category-specific filters */}
      {category === 'hike' && (
        <>
          <Separator />
          <HikeFilters
            selectedDifficulty={(filters as HikeFilterState).difficulty}
            selectedSurface={(filters as HikeFilterState).surface}
            strollerFriendly={(filters as HikeFilterState).strollerFriendly}
            isLoop={(filters as HikeFilterState).isLoop}
            onToggleDifficulty={handleDifficultyToggle}
            onToggleSurface={handleSurfaceToggle}
            onSetStrollerFriendly={handleStrollerFriendlyChange}
            onSetIsLoop={handleIsLoopChange}
          />
        </>
      )}

      {category === 'eat' && (
        <>
          <Separator />
          <EatFilters
            selectedMealTypes={(filters as EatFilterState).mealTypes}
            selectedFeatures={(filters as EatFilterState).features}
            onToggleMealType={handleMealTypeToggle}
            onToggleFeature={handleEatFeatureToggle}
          />
        </>
      )}

      {/* Reset button */}
      {activeCount > 0 && (
        <>
          <Separator />
          <Button variant="outline" onClick={onReset} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Clear all filters
          </Button>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile: Sheet */}
      <div className="lg:hidden mb-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)] mt-4 pr-4">
              {filterContent}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Collapsible panel */}
      <div className="hidden lg:block mb-6">
        <div className="border rounded-lg p-4 bg-card">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
              {activeCount > 0 && (
                <Badge variant="secondary">{activeCount} active</Badge>
              )}
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={filterPanelVariants}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  {filterContent}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
