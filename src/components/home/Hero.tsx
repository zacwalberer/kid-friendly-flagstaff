'use client'

import { motion } from 'framer-motion'
import { MapPin, Trees, Tent, Footprints, UtensilsCrossed, Telescope, ShoppingBag } from 'lucide-react'
import { fadeIn, slideUp } from '@/lib/animations'

export function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-20 left-[10%] text-[var(--forest-400)]"
        >
          <Trees className="h-24 w-24" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.08, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute top-32 right-[15%] text-[var(--forest-400)]"
        >
          <Trees className="h-32 w-32" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.06, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-20 left-[20%] text-[var(--forest-400)]"
        >
          <Trees className="h-20 w-20" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div variants={slideUp} className="text-center max-w-3xl mx-auto">
          <motion.div
            variants={slideUp}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--forest-100)] text-[var(--forest-700)]">
              <MapPin className="h-4 w-4 text-[var(--forest-500)]" />
              <span className="text-sm font-medium">Flagstaff, Arizona</span>
            </div>
          </motion.div>

          <motion.h1
            variants={slideUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-[var(--forest-800)]"
          >
            Kid Friendly Flagstaff
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-lg md:text-xl text-[var(--forest-600)] mb-8 leading-relaxed"
          >
            Discover the best family-friendly activities, restaurants, hikes, and more
            in the mountain town of Flagstaff. From playgrounds to trails, we&apos;ve got
            your family covered.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="flex flex-wrap justify-center gap-3 text-sm"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--cream-100)] border border-[var(--cream-300)] text-[var(--forest-700)]">
              <Tent className="h-4 w-4 text-[var(--category-play)]" />
              <span>Playgrounds</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--cream-100)] border border-[var(--cream-300)] text-[var(--forest-700)]">
              <Footprints className="h-4 w-4 text-[var(--category-hike)]" />
              <span>Hikes</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--cream-100)] border border-[var(--cream-300)] text-[var(--forest-700)]">
              <UtensilsCrossed className="h-4 w-4 text-[var(--category-eat)]" />
              <span>Restaurants</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--cream-100)] border border-[var(--cream-300)] text-[var(--forest-700)]">
              <Telescope className="h-4 w-4 text-[var(--category-explore)]" />
              <span>Attractions</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--cream-100)] border border-[var(--cream-300)] text-[var(--forest-700)]">
              <ShoppingBag className="h-4 w-4 text-[var(--category-shop)]" />
              <span>Shops</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom mountain decoration */}
      <div className="absolute inset-x-0 bottom-0 h-16 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,120 L0,100 L150,80 L300,95 L450,60 L600,85 L750,55 L900,75 L1050,50 L1200,70 L1200,120 Z"
            fill="var(--cream-200)"
            fillOpacity="0.5"
          />
          <path
            d="M0,120 L0,105 L200,90 L400,100 L600,75 L800,95 L1000,70 L1200,85 L1200,120 Z"
            fill="var(--cream-200)"
          />
        </svg>
      </div>
    </motion.section>
  )
}
