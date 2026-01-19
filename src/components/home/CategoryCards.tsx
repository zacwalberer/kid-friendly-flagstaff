'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { staggerContainer, staggerItem, cardHover } from '@/lib/animations'
import { CATEGORY_INFO } from '@/utils/constants'

const CATEGORY_EMOJIS: Record<string, string> = {
  play: '🎪',
  hike: '🥾',
  eat: '🍕',
  explore: '🔭',
  shop: '🛍️',
}

const CATEGORY_COLORS: Record<string, string> = {
  play: 'from-pink-500 to-rose-500',
  hike: 'from-green-500 to-emerald-500',
  eat: 'from-orange-500 to-amber-500',
  explore: 'from-blue-500 to-indigo-500',
  shop: 'from-purple-500 to-violet-500',
}

interface CategoryCardsProps {
  activityCounts?: Record<string, number>
}

export function CategoryCards({ activityCounts = {} }: CategoryCardsProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {CATEGORY_INFO.map((category) => (
            <motion.div key={category.id} variants={staggerItem} {...cardHover}>
              <Link href={`/${category.slug}`}>
                <Card className="h-full overflow-hidden cursor-pointer group">
                  <CardContent className="p-0">
                    <div
                      className={`h-24 bg-gradient-to-br ${CATEGORY_COLORS[category.id]} flex items-center justify-center`}
                    >
                      <span className="text-4xl">{CATEGORY_EMOJIS[category.id]}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 flex items-center justify-between">
                        {category.name}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                      {activityCounts[category.id] !== undefined && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {activityCounts[category.id]} activities
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
