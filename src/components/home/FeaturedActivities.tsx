'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { ActivityGrid } from '@/components/activity/ActivityGrid'
import { fadeIn, slideUp } from '@/lib/animations'
import type { Activity } from '@/types'

interface FeaturedActivitiesProps {
  activities: Activity[]
}

export function FeaturedActivities({ activities }: FeaturedActivitiesProps) {
  if (activities.length === 0) return null

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.div
            variants={slideUp}
            className="flex items-center gap-2 mb-8"
          >
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl md:text-3xl font-bold">Featured Activities</h2>
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
