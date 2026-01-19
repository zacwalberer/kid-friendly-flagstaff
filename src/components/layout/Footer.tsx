import Link from 'next/link'
import { Trees, Heart, Mountain } from 'lucide-react'
import { CATEGORY_INFO } from '@/utils/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      {/* Mountain silhouette decoration */}
      <div className="absolute inset-x-0 top-0 h-20 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          style={{ transform: 'scaleY(-1)' }}
        >
          <path
            d="M0,120 L0,80 L200,40 L350,70 L500,20 L650,60 L800,30 L950,50 L1100,25 L1200,60 L1200,120 Z"
            fill="var(--forest-800)"
          />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="forest-footer-gradient text-[var(--cream-100)] pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--forest-600)]">
                  <Trees className="h-6 w-6 text-[var(--cream-100)]" />
                </div>
                <h3 className="text-lg font-display font-bold text-[var(--cream-50)]">
                  Kid Friendly Flagstaff
                </h3>
              </div>
              <p className="text-[var(--forest-300)] text-sm leading-relaxed">
                Helping families discover the best kid-friendly activities in
                Flagstaff, Arizona&apos;s beautiful ponderosa pine forests.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-display font-semibold text-[var(--cream-50)] mb-4 flex items-center gap-2">
                <Mountain className="h-4 w-4 text-[var(--aspen-400)]" />
                Explore
              </h4>
              <nav className="flex flex-col gap-2">
                {CATEGORY_INFO.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                    className="text-sm text-[var(--forest-300)] hover:text-[var(--aspen-400)] transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* About */}
            <div>
              <h4 className="font-display font-semibold text-[var(--cream-50)] mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4 text-[var(--aspen-400)]" />
                About
              </h4>
              <p className="text-sm text-[var(--forest-300)] mb-2 leading-relaxed">
                Created with love for Flagstaff families who want to explore the outdoors together.
              </p>
              <p className="text-sm text-[var(--forest-300)] leading-relaxed">
                Have a suggestion? We&apos;d love to hear from you!
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[var(--forest-700)] pt-6 mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[var(--forest-400)]">
                &copy; {currentYear} Kid Friendly Flagstaff. All rights reserved.
              </p>
              <p className="text-xs text-[var(--forest-500)] flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-[var(--category-play)]" /> in Flagstaff, AZ
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
