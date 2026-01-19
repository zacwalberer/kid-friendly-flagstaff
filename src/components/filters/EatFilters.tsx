'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import {
  MEAL_TYPE_LABELS,
  EAT_FEATURE_LABELS,
  EAT_FEATURE_ICONS,
  ALL_MEAL_TYPES,
  ALL_EAT_FEATURES,
} from '@/utils/constants'
import type { MealType, EatFeature } from '@/types'

interface EatFiltersProps {
  selectedMealTypes: MealType[]
  selectedFeatures: EatFeature[]
  onToggleMealType: (mealType: MealType) => void
  onToggleFeature: (feature: EatFeature) => void
}

export function EatFilters({
  selectedMealTypes,
  selectedFeatures,
  onToggleMealType,
  onToggleFeature,
}: EatFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Meal Types */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Meal Type</label>
        <div className="flex flex-wrap gap-2">
          {ALL_MEAL_TYPES.map((mealType) => {
            const isSelected = selectedMealTypes.includes(mealType)
            return (
              <button
                key={mealType}
                onClick={() => onToggleMealType(mealType)}
                className={cn(
                  'filter-pill transition-colors',
                  isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
                )}
              >
                {MEAL_TYPE_LABELS[mealType]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Features</label>
        <div className="space-y-2">
          {ALL_EAT_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => onToggleFeature(feature)}
              />
              <label
                htmlFor={`feature-${feature}`}
                className="text-sm cursor-pointer flex items-center gap-1"
              >
                <span>{EAT_FEATURE_ICONS[feature]}</span>
                {EAT_FEATURE_LABELS[feature]}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
