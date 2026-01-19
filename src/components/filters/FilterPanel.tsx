'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, ChevronUp, Search, Trees } from 'lucide-react'
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
import { AccessibilityFilter } from './AccessibilityFilter'
import { HikeFilters } from './HikeFilters'
import { EatFilters } from './EatFilters'
import { filterPanelVariants } from '@/lib/animations'
import { countActiveFilters } from '@/utils/filterActivities'
import { cn } from '@/lib/utils'
import { SETTING_LABELS, ALL_SETTINGS } from '@/utils/constants'
import type { Category, AgeRange, Weather, Amenity, Difficulty, Surface, MealType, EatFeature, Accessibility, Setting, ShadeCoverage } from '@/types'
import type { BaseFilterState, HikeFilterState, EatFilterState, PlayFilterState, ExploreFilterState } from '@/types/filters'

interface FilterPanelProps {
  category: Category
  filters: BaseFilterState | HikeFilterState | EatFilterState | PlayFilterState | ExploreFilterState
  onFilterChange: (filters: BaseFilterState | HikeFilterState | EatFilterState | PlayFilterState | ExploreFilterState) => void
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

  const handleAccessibilityToggle = (accessibility: Accessibility) => {
    const newAccessibility = filters.accessibility.includes(accessibility)
      ? filters.accessibility.filter((a) => a !== accessibility)
      : [...filters.accessibility, accessibility]
    onFilterChange({ ...filters, accessibility: newAccessibility })
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

  const handleIsLoopChange = (value: boolean | null) => {
    if (category !== 'hike') return
    onFilterChange({ ...(filters as HikeFilterState), isLoop: value })
  }

  const handleShadeCoverageChange = (value: ShadeCoverage | null) => {
    if (category !== 'hike') return
    onFilterChange({ ...(filters as HikeFilterState), shadeCoverage: value })
  }

  // Play/Explore-specific handlers
  const handleSettingChange = (value: Setting | null) => {
    if (category === 'play') {
      onFilterChange({ ...(filters as PlayFilterState), setting: value })
    } else if (category === 'explore') {
      onFilterChange({ ...(filters as ExploreFilterState), setting: value })
    }
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
        <label className="text-sm font-display font-medium text-[var(--forest-700)]">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--forest-400)]" />
          <Input
            type="text"
            placeholder="Search activities..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 border-[var(--cream-300)] bg-[var(--cream-50)] focus:border-[var(--forest-400)] focus:ring-[var(--forest-400)]"
          />
        </div>
      </div>

      <Separator className="bg-[var(--cream-300)]" />

      {/* Age Range */}
      <AgeRangePills selected={filters.ageRanges} onToggle={handleAgeToggle} />

      <Separator className="bg-[var(--cream-300)]" />

      {/* Weather */}
      <WeatherFilter selected={filters.weather} onToggle={handleWeatherToggle} />

      <Separator className="bg-[var(--cream-300)]" />

      {/* Amenities */}
      <AmenityFilter selected={filters.amenities} onToggle={handleAmenityToggle} />

      <Separator className="bg-[var(--cream-300)]" />

      {/* Accessibility */}
      <AccessibilityFilter selected={filters.accessibility} onToggle={handleAccessibilityToggle} />

      {/* Category-specific filters */}
      {category === 'hike' && (
        <>
          <Separator className="bg-[var(--cream-300)]" />
          <HikeFilters
            selectedDifficulty={(filters as HikeFilterState).difficulty}
            selectedSurface={(filters as HikeFilterState).surface}
            isLoop={(filters as HikeFilterState).isLoop}
            shadeCoverage={(filters as HikeFilterState).shadeCoverage}
            onToggleDifficulty={handleDifficultyToggle}
            onToggleSurface={handleSurfaceToggle}
            onSetIsLoop={handleIsLoopChange}
            onSetShadeCoverage={handleShadeCoverageChange}
          />
        </>
      )}

      {category === 'eat' && (
        <>
          <Separator className="bg-[var(--cream-300)]" />
          <EatFilters
            selectedMealTypes={(filters as EatFilterState).mealTypes}
            selectedFeatures={(filters as EatFilterState).features}
            onToggleMealType={handleMealTypeToggle}
            onToggleFeature={handleEatFeatureToggle}
          />
        </>
      )}

      {(category === 'play' || category === 'explore') && (
        <>
          <Separator className="bg-[var(--cream-300)]" />
          <div className="space-y-2">
            <label className="text-sm font-medium">Setting</label>
            <div className="flex flex-wrap gap-2">
              {ALL_SETTINGS.map((setting) => {
                const currentSetting = category === 'play'
                  ? (filters as PlayFilterState).setting
                  : (filters as ExploreFilterState).setting
                const isSelected = currentSetting === setting
                return (
                  <button
                    key={setting}
                    onClick={() => handleSettingChange(isSelected ? null : setting)}
                    className={cn(
                      'filter-pill transition-colors',
                      isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
                    )}
                  >
                    {SETTING_LABELS[setting]}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* Reset button */}
      {activeCount > 0 && (
        <>
          <Separator className="bg-[var(--cream-300)]" />
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full border-[var(--bark-300)] text-[var(--bark-500)] hover:bg-[var(--bark-50)] hover:text-[var(--bark-600)]"
          >
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
            <Button variant="outline" className="w-full border-[var(--cream-300)] text-[var(--forest-700)] hover:bg-[var(--forest-100)]">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-[var(--forest-500)] text-white">
                  {activeCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-[var(--cream-50)] border-r-[var(--cream-300)]">
            <SheetHeader className="border-b border-[var(--cream-300)] pb-4">
              <SheetTitle className="flex items-center gap-2 font-display text-[var(--forest-800)]">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--forest-100)]">
                  <Trees className="h-4 w-4 text-[var(--forest-600)]" />
                </div>
                Filters
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)] mt-4 pr-4">
              {filterContent}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Collapsible panel */}
      <div className="hidden lg:block mb-6">
        <div className="border border-[var(--cream-300)] rounded-xl p-4 bg-[var(--cream-100)] shadow-forest-sm">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--forest-100)]">
                <Filter className="h-4 w-4 text-[var(--forest-600)]" />
              </div>
              <span className="font-display font-medium text-[var(--forest-800)]">Filters</span>
              {activeCount > 0 && (
                <Badge variant="secondary" className="bg-[var(--forest-500)] text-white">
                  {activeCount} active
                </Badge>
              )}
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-[var(--forest-500)]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[var(--forest-500)]" />
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
