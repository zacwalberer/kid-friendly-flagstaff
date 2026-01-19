'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { ACCESSIBILITY_LABELS, ACCESSIBILITY_ICONS, ALL_ACCESSIBILITY } from '@/utils/constants'
import type { Accessibility } from '@/types'

interface AccessibilityFilterProps {
  selected: Accessibility[]
  onToggle: (accessibility: Accessibility) => void
}

export function AccessibilityFilter({ selected, onToggle }: AccessibilityFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Accessibility</label>
      <div className="space-y-2">
        {ALL_ACCESSIBILITY.map((accessibility) => (
          <div key={accessibility} className="flex items-center gap-2">
            <Checkbox
              id={`accessibility-${accessibility}`}
              checked={selected.includes(accessibility)}
              onCheckedChange={() => onToggle(accessibility)}
            />
            <label
              htmlFor={`accessibility-${accessibility}`}
              className="text-sm cursor-pointer flex items-center gap-1"
            >
              <span>{ACCESSIBILITY_ICONS[accessibility]}</span>
              {ACCESSIBILITY_LABELS[accessibility]}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
