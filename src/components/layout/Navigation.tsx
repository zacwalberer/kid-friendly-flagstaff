'use client'

import Link from 'next/link'
import { Tent, Footprints, UtensilsCrossed, Telescope, ShoppingBag, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORY_INFO } from '@/utils/constants'

interface NavigationProps {
  pathname: string
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  play: Tent,
  hike: Footprints,
  eat: UtensilsCrossed,
  explore: Telescope,
  shop: ShoppingBag,
}

export function Navigation({ pathname }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {CATEGORY_INFO.map((category) => {
        const isActive = pathname === `/${category.slug}`
        const Icon = CATEGORY_ICONS[category.id]
        return (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-display font-medium transition-all duration-200 flex items-center gap-2',
              'hover:bg-[var(--forest-100)] hover:text-[var(--forest-700)]',
              isActive
                ? 'bg-[var(--forest-500)] text-[var(--cream-50)] hover:bg-[var(--forest-600)] hover:text-[var(--cream-50)]'
                : 'text-[var(--forest-700)]'
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {category.name}
          </Link>
        )
      })}
    </nav>
  )
}
