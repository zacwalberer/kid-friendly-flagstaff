'use client'

import { motion } from 'framer-motion'
import { ListingCard } from './ListingCard'
import { staggerContainer } from '@/lib/animations'
import type { Listing } from '@/types'

interface ListingGridProps {
  listings: Listing[]
  emptyMessage?: string
}

export function ListingGrid({
  listings,
  emptyMessage = 'No listings found matching your filters.',
}: ListingGridProps) {
  if (listings.length === 0) {
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
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </motion.div>
  )
}
