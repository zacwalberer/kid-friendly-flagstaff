'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CATEGORY_INFO } from '@/utils/constants'

interface NavigationProps {
  pathname: string
}

const CATEGORY_EMOJIS: Record<string, string> = {
  play: '🎪',
  hike: '🥾',
  eat: '🍕',
  explore: '🔭',
  shop: '🛍️',
}

export function Navigation({ pathname }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {CATEGORY_INFO.map((category) => {
        const isActive = pathname === `/${category.slug}`
        return (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground'
            )}
          >
            <span className="mr-1.5">{CATEGORY_EMOJIS[category.id]}</span>
            {category.name}
          </Link>
        )
      })}
    </nav>
  )
}
