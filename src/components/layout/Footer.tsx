import Link from 'next/link'
import { CATEGORY_INFO } from '@/utils/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kid Friendly Flagstaff</h3>
            <p className="text-muted-foreground text-sm">
              Helping families discover the best kid-friendly activities in
              Flagstaff, Arizona.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <nav className="flex flex-col gap-2">
              {CATEGORY_INFO.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Created with love for Flagstaff families.
            </p>
            <p className="text-sm text-muted-foreground">
              Have a suggestion? We&apos;d love to hear from you!
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Kid Friendly Flagstaff. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
