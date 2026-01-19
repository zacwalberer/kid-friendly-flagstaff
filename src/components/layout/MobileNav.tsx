'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Home, Tent, Footprints, UtensilsCrossed, Telescope, ShoppingBag, Trees, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { CATEGORY_INFO } from '@/utils/constants'

interface MobileNavProps {
  pathname: string
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  play: Tent,
  hike: Footprints,
  eat: UtensilsCrossed,
  explore: Telescope,
  shop: ShoppingBag,
}

export function MobileNav({ pathname }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-[var(--forest-700)] hover:bg-[var(--forest-100)]">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] bg-[var(--cream-50)] border-l-[var(--cream-300)]">
        <SheetHeader className="border-b border-[var(--cream-300)] pb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--forest-500)]">
              <Trees className="h-5 w-5 text-[var(--cream-50)]" />
            </div>
            <span className="font-display font-bold text-[var(--forest-800)]">
              Kid Friendly Flagstaff
            </span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              'px-4 py-3 rounded-lg text-base font-display font-medium transition-all duration-200 flex items-center gap-3',
              'hover:bg-[var(--forest-100)]',
              pathname === '/'
                ? 'bg-[var(--forest-500)] text-[var(--cream-50)]'
                : 'text-[var(--forest-700)]'
            )}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          {CATEGORY_INFO.map((category) => {
            const isActive = pathname === `/${category.slug}`
            const Icon = CATEGORY_ICONS[category.id]
            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-lg text-base font-display font-medium transition-all duration-200 flex items-center gap-3',
                  'hover:bg-[var(--forest-100)]',
                  isActive
                    ? 'bg-[var(--forest-500)] text-[var(--cream-50)]'
                    : 'text-[var(--forest-700)]'
                )}
              >
                {Icon && <Icon className="h-5 w-5" />}
                {category.name}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
