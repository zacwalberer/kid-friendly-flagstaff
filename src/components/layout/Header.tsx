'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Trees } from 'lucide-react'
import { Navigation } from './Navigation'
import { MobileNav } from './MobileNav'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--cream-300)] bg-[var(--cream-50)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--cream-50)]/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--forest-500)] text-[var(--cream-50)] transition-all duration-200 group-hover:bg-[var(--forest-600)] group-hover:shadow-[var(--shadow-md)]">
            <Trees className="h-6 w-6" />
          </div>
          <span className="text-xl font-display font-bold text-[var(--forest-800)] hidden sm:block">
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
