'use client'

import { cn } from '@/lib/utils'
import { AGE_DISPLAY_NAMES, ALL_AGE_RANGES } from '@/utils/constants'
import type { AgeRange } from '@/types'

interface AgeRangePillsProps {
  selected: AgeRange[]
  onToggle: (age: AgeRange) => void
}

export function AgeRangePills({ selected, onToggle }: AgeRangePillsProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-display font-medium text-[var(--forest-700)]">Age Range</label>
      <div className="flex flex-wrap gap-2">
        {ALL_AGE_RANGES.map((age) => {
          const isSelected = selected.includes(age)
          return (
            <button
              key={age}
              onClick={() => onToggle(age)}
              className={cn(
                'filter-pill',
                isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
              )}
            >
              {AGE_DISPLAY_NAMES[age]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
