'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { MobileNav } from './MobileNav'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            Kid Friendly Flagstaff
          </span>
        </Link>

        {/* Desktop Navigation */}
        <Navigation pathname={pathname} />

        {/* Mobile Navigation */}
        <MobileNav pathname={pathname} />
      </div>
    </header>
  )
}
