'use client'

import { cn } from '@/lib/utils'
import {
  DIFFICULTY_LABELS,
  SURFACE_LABELS,
  SHADE_COVERAGE_LABELS,
  HIKE_TYPE_LABELS,
  ALL_DIFFICULTIES,
  ALL_SURFACES,
  ALL_SHADE_COVERAGES,
  ALL_HIKE_TYPES,
} from '@/utils/constants'
import type { Difficulty, Surface, ShadeCoverage, HikeType } from '@/types'

interface HikeFiltersProps {
  selectedDifficulty: Difficulty[]
  selectedSurface: Surface[]
  hikeType: HikeType | null
  shadeCoverage: ShadeCoverage | null
  onToggleDifficulty: (difficulty: Difficulty) => void
  onToggleSurface: (surface: Surface) => void
  onSetHikeType: (value: HikeType | null) => void
  onSetShadeCoverage: (value: ShadeCoverage | null) => void
}

export function HikeFilters({
  selectedDifficulty,
  selectedSurface,
  hikeType,
  shadeCoverage,
  onToggleDifficulty,
  onToggleSurface,
  onSetHikeType,
  onSetShadeCoverage,
}: HikeFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Difficulty */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Difficulty</label>
        <div className="flex flex-wrap gap-2">
          {ALL_DIFFICULTIES.map((difficulty) => {
            const isSelected = selectedDifficulty.includes(difficulty)
            return (
              <button
                key={difficulty}
                onClick={() => onToggleDifficulty(difficulty)}
                className={cn(
                  'filter-pill transition-colors',
                  isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
                )}
              >
                {DIFFICULTY_LABELS[difficulty]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Surface */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Surface Type</label>
        <div className="flex flex-wrap gap-2">
          {ALL_SURFACES.map((surface) => {
            const isSelected = selectedSurface.includes(surface)
            return (
              <button
                key={surface}
                onClick={() => onToggleSurface(surface)}
                className={cn(
                  'filter-pill transition-colors',
                  isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
                )}
              >
                {SURFACE_LABELS[surface]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Trail Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Trail Type</label>
        <div className="flex gap-2">
          {ALL_HIKE_TYPES.map((type) => {
            const isSelected = hikeType === type
            return (
              <button
                key={type}
                onClick={() => onSetHikeType(isSelected ? null : type)}
                className={cn(
                  'filter-pill transition-colors',
                  isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
                )}
              >
                {HIKE_TYPE_LABELS[type]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Shade Coverage */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Shade Coverage</label>
        <div className="flex flex-wrap gap-2">
          {ALL_SHADE_COVERAGES.map((shade) => {
            const isSelected = shadeCoverage === shade
            return (
              <button
                key={shade}
                onClick={() => onSetShadeCoverage(isSelected ? null : shade)}
                className={cn(
                  'filter-pill transition-colors',
                  isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
                )}
              >
                {SHADE_COVERAGE_LABELS[shade]}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
