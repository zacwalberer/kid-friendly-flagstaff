'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ArrowRight, Tent, Footprints, UtensilsCrossed, GraduationCap, ShoppingBag, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { KidFriendlinessScore } from '@/components/shared/KidFriendlinessScore'
import { slideUp } from '@/lib/animations'
import type { Listing } from '@/types'

interface TopPickProps {
  listing: Listing
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  play: Tent,
  hike: Footprints,
  eat: UtensilsCrossed,
  learn: GraduationCap,
  shop: ShoppingBag,
}

export function TopPick({ listing }: TopPickProps) {
  const Icon = CATEGORY_ICONS[listing.category]

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <Card className="overflow-hidden top-pick-card shadow-forest-lg">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto min-h-[200px]">
              {listing.images[0] ? (
                <Image
                  src={listing.images[0]}
                  alt={listing.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--aspen-300)] to-[var(--aspen-400)]">
                  {Icon ? (
                    <Icon className="h-16 w-16 text-[var(--forest-800)]/60" strokeWidth={1.5} />
                  ) : (
                    <Star className="h-16 w-16 text-[var(--forest-800)]/60" />
                  )}
                </div>
              )}
              <Badge className="absolute top-4 left-4 top-pick-badge">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Top Pick
              </Badge>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-display font-bold text-[var(--forest-800)]">
                  {listing.name}
                </h3>
                <KidFriendlinessScore score={listing.kidFriendlinessScore} />
              </div>

              <p className="text-[var(--forest-600)] mb-4 leading-relaxed">
                {listing.shortDescription}
              </p>

              {listing.topPickReason && (
                <div className="bg-[var(--aspen-300)]/50 border border-[var(--aspen-400)] text-[var(--forest-800)] p-4 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong className="font-display">Why we love it:</strong>{' '}
                    {listing.topPickReason}
                  </p>
                </div>
              )}

              <Link href={`/listing/${listing.slug}`}>
                <Button className="bg-[var(--forest-500)] hover:bg-[var(--forest-600)] text-white font-display shadow-forest-sm hover:shadow-forest-md transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
