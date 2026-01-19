'use client'

import { motion } from 'framer-motion'
import { Star, Sparkles } from 'lucide-react'
import { ActivityGrid } from '@/components/activity/ActivityGrid'
import { fadeIn, slideUp } from '@/lib/animations'
import type { Activity } from '@/types'

interface FeaturedActivitiesProps {
  activities: Activity[]
}

export function FeaturedActivities({ activities }: FeaturedActivitiesProps) {
  if (activities.length === 0) return null

  return (
    <section className="py-12 bg-[var(--cream-100)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.div
            variants={slideUp}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--aspen-300)]">
              <Star className="h-5 w-5 text-[var(--forest-900)] fill-[var(--forest-900)]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--forest-800)]">
                Featured Activities
              </h2>
              <p className="text-sm text-[var(--forest-600)] flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[var(--aspen-400)]" />
                Hand-picked family favorites
              </p>
            </div>
          </motion.div>

          <ActivityGrid
            activities={activities}
            emptyMessage="No featured activities yet."
          />
        </motion.div>
      </div>
    </section>
  )
}
