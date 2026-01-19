'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
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

const CATEGORY_EMOJIS: Record<string, string> = {
  play: '🎪',
  hike: '🥾',
  eat: '🍕',
  explore: '🔭',
  shop: '🛍️',
}

export function MobileNav({ pathname }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <SheetHeader>
          <SheetTitle>Kid Friendly Flagstaff</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              'px-4 py-3 rounded-md text-base font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              pathname === '/' && 'bg-accent text-accent-foreground'
            )}
          >
            Home
          </Link>
          {CATEGORY_INFO.map((category) => {
            const isActive = pathname === `/${category.slug}`
            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-md text-base font-medium transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground'
                )}
              >
                <span className="mr-2">{CATEGORY_EMOJIS[category.id]}</span>
                {category.name}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
