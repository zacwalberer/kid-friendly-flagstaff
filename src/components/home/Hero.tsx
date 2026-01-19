'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { fadeIn, slideUp } from '@/lib/animations'

export function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <motion.div variants={slideUp} className="text-center max-w-3xl mx-auto">
          <motion.div
            variants={slideUp}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-4"
          >
            <MapPin className="h-5 w-5" />
            <span>Flagstaff, Arizona</span>
          </motion.div>

          <motion.h1
            variants={slideUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Kid Friendly Flagstaff
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            Discover the best family-friendly activities, restaurants, hikes, and more
            in the mountain town of Flagstaff. From playgrounds to trails, we&apos;ve got
            your family covered.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1">
              <span className="text-lg">🎪</span> Playgrounds
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🥾</span> Hikes
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🍕</span> Restaurants
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🔭</span> Attractions
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🛍️</span> Shops
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
