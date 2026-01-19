'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { AMENITY_LABELS, AMENITY_ICONS, ALL_AMENITIES } from '@/utils/constants'
import type { Amenity } from '@/types'

interface AmenityFilterProps {
  selected: Amenity[]
  onToggle: (amenity: Amenity) => void
}

export function AmenityFilter({ selected, onToggle }: AmenityFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Amenities</label>
      <div className="space-y-2">
        {ALL_AMENITIES.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <Checkbox
              id={`amenity-${amenity}`}
              checked={selected.includes(amenity)}
              onCheckedChange={() => onToggle(amenity)}
            />
            <label
              htmlFor={`amenity-${amenity}`}
              className="text-sm cursor-pointer flex items-center gap-1"
            >
              <span>{AMENITY_ICONS[amenity]}</span>
              {AMENITY_LABELS[amenity]}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
