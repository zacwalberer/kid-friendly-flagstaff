'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KidFriendlinessScoreProps {
  score: 1 | 2 | 3 | 4 | 5
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export function KidFriendlinessScore({
  score,
  size = 'md',
  showLabel = false,
}: KidFriendlinessScoreProps) {
  return (
    <div className="flex items-center gap-1">
      {showLabel && (
        <span className="text-sm text-muted-foreground mr-1">Kid-friendly:</span>
      )}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            className={cn(
              sizeClasses[size],
              value <= score
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>
    </div>
  )
}
