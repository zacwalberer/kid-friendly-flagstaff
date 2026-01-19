'use client'

import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '@/lib/animations'
import type { CategoryInfo } from '@/types'

interface CategoryHeaderProps {
  category: CategoryInfo
  activityCount: number
}

const CATEGORY_EMOJIS: Record<string, string> = {
  play: '🎪',
  hike: '🥾',
  eat: '🍕',
  explore: '🔭',
  shop: '🛍️',
}

export function CategoryHeader({ category, activityCount }: CategoryHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="mb-8"
    >
      <motion.div variants={slideUp} className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{CATEGORY_EMOJIS[category.id]}</span>
        <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
      </motion.div>
      <motion.p variants={slideUp} className="text-muted-foreground text-lg">
        {category.description}
      </motion.p>
      <motion.p variants={slideUp} className="text-sm text-muted-foreground mt-2">
        {activityCount} {activityCount === 1 ? 'activity' : 'activities'} found
      </motion.p>
    </motion.div>
  )
}
