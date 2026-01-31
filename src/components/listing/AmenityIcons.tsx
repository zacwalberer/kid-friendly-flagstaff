'use client'

import { AMENITY_ICONS, AMENITY_LABELS } from '@/utils/constants'
import type { Amenity } from '@/types'

interface AmenityIconsProps {
  amenities: Amenity[]
  showLabels?: boolean
  maxDisplay?: number
}

// We need to add the Tooltip component from shadcn
// For now, let's use a simple title attribute approach
export function AmenityIcons({
  amenities,
  showLabels = false,
  maxDisplay = 5,
}: AmenityIconsProps) {
  const displayAmenities = amenities.slice(0, maxDisplay)
  const remaining = amenities.length - maxDisplay

  return (
    <div className="flex flex-wrap items-center gap-2">
      {displayAmenities.map((amenity) => (
        <span
          key={amenity}
          title={AMENITY_LABELS[amenity]}
          className="inline-flex items-center gap-1 text-sm"
        >
          <span>{AMENITY_ICONS[amenity]}</span>
          {showLabels && (
            <span className="text-muted-foreground">{AMENITY_LABELS[amenity]}</span>
          )}
        </span>
      ))}
      {remaining > 0 && (
        <span className="text-sm text-muted-foreground">+{remaining} more</span>
      )}
    </div>
  )
}
