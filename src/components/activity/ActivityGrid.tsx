'use client'

import { motion } from 'framer-motion'
import { ActivityCard } from './ActivityCard'
import { staggerContainer } from '@/lib/animations'
import type { Activity } from '@/types'

interface ActivityGridProps {
  activities: Activity[]
  emptyMessage?: string
}

export function ActivityGrid({
  activities,
  emptyMessage = 'No activities found matching your filters.',
}: ActivityGridProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </motion.div>
  )
}
