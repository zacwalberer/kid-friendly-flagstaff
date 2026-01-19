'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Tent, Footprints, UtensilsCrossed, Telescope, ShoppingBag, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { staggerContainer, staggerItem, cardHover } from '@/lib/animations'
import { CATEGORY_INFO } from '@/utils/constants'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  play: Tent,
  hike: Footprints,
  eat: UtensilsCrossed,
  explore: Telescope,
  shop: ShoppingBag,
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  play: 'gradient-play',
  hike: 'gradient-hike',
  eat: 'gradient-eat',
  explore: 'gradient-explore',
  shop: 'gradient-shop',
}

interface CategoryCardsProps {
  activityCounts?: Record<string, number>
}

export function CategoryCards({ activityCounts = {} }: CategoryCardsProps) {
  return (
    <section className="py-12 bg-[var(--cream-200)]/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {CATEGORY_INFO.map((category) => {
            const Icon = CATEGORY_ICONS[category.id]
            return (
              <motion.div key={category.id} variants={staggerItem} {...cardHover}>
                <Link href={`/${category.slug}`}>
                  <Card className="h-full overflow-hidden cursor-pointer group border-[var(--cream-300)] bg-[var(--cream-100)] shadow-forest-sm hover:shadow-forest-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div
                        className={`h-24 ${CATEGORY_GRADIENTS[category.id]} flex items-center justify-center`}
                      >
                        {Icon && <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />}
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-[var(--forest-800)] mb-1 flex items-center justify-between">
                          {category.name}
                          <ArrowRight className="h-4 w-4 text-[var(--forest-400)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-xs text-[var(--forest-600)] line-clamp-2">
                          {category.description}
                        </p>
                        {activityCounts[category.id] !== undefined && (
                          <p className="text-xs text-[var(--forest-500)] mt-2 font-medium">
                            {activityCounts[category.id]} activities
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
