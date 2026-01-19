'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { WEATHER_LABELS, WEATHER_ICONS, ALL_WEATHER } from '@/utils/constants'
import type { Weather } from '@/types'

interface WeatherFilterProps {
  selected: Weather[]
  onToggle: (weather: Weather) => void
}

export function WeatherFilter({ selected, onToggle }: WeatherFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Weather</label>
      <div className="space-y-2">
        {ALL_WEATHER.map((weather) => (
          <div key={weather} className="flex items-center gap-2">
            <Checkbox
              id={`weather-${weather}`}
              checked={selected.includes(weather)}
              onCheckedChange={() => onToggle(weather)}
            />
            <label
              htmlFor={`weather-${weather}`}
              className="text-sm cursor-pointer flex items-center gap-1"
            >
              <span>{WEATHER_ICONS[weather]}</span>
              {WEATHER_LABELS[weather]}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
