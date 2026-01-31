'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, DollarSign, Star, Tent, Footprints, UtensilsCrossed, GraduationCap, ShoppingBag, type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KidFriendlinessScore } from '@/components/shared/KidFriendlinessScore'
import { AmenityIcons } from './AmenityIcons'
import { AGE_DISPLAY_NAMES, WEATHER_ICONS } from '@/utils/constants'
import { cardHover, staggerItem } from '@/lib/animations'
import type { Listing } from '@/types'

interface ListingCardProps {
  listing: Listing
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  play: Tent,
  hike: Footprints,
  eat: UtensilsCrossed,
  learn: GraduationCap,
  shop: ShoppingBag,
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  play: 'gradient-play',
  hike: 'gradient-hike',
  eat: 'gradient-eat',
  learn: 'gradient-learn',
  shop: 'gradient-shop',
}

export function ListingCard({ listing }: ListingCardProps) {
  const Icon = CATEGORY_ICONS[listing.category]

  return (
    <motion.div
      variants={staggerItem}
      {...cardHover}
      className="h-full"
    >
      <Link href={`/listing/${listing.slug}`}>
        <Card className="h-full overflow-hidden listing-card cursor-pointer border-[var(--cream-300)] bg-[var(--cream-100)]">
          {/* Image */}
          <div className="relative aspect-video bg-[var(--cream-200)]">
            {listing.images[0] ? (
              <Image
                src={listing.images[0]}
                alt={listing.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className={`absolute inset-0 flex items-center justify-center ${CATEGORY_GRADIENTS[listing.category]}`}>
                {Icon && <Icon className="h-12 w-12 text-white/80" strokeWidth={1.5} />}
              </div>
            )}
            {listing.isTopPick && (
              <Badge className="absolute top-2 left-2 top-pick-badge">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Top Pick
              </Badge>
            )}
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg line-clamp-2 font-display text-[var(--forest-800)]">
                {listing.name}
              </CardTitle>
              <KidFriendlinessScore score={listing.kidFriendlinessScore} size="sm" />
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Short description */}
            <p className="text-sm text-[var(--forest-600)] line-clamp-2">
              {listing.shortDescription}
            </p>

            {/* Age ranges */}
            <div className="flex flex-wrap gap-1">
              {listing.ageRanges.slice(0, 3).map((age) => (
                <Badge key={age} variant="secondary" className="text-xs bg-[var(--forest-100)] text-[var(--forest-700)] border-0">
                  {AGE_DISPLAY_NAMES[age]}
                </Badge>
              ))}
              {listing.ageRanges.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-[var(--forest-100)] text-[var(--forest-700)] border-0">
                  +{listing.ageRanges.length - 3}
                </Badge>
              )}
            </div>

            {/* Weather icons */}
            <div className="flex items-center gap-1">
              {listing.weather.map((w) => (
                <span key={w} title={w} className="text-sm">
                  {WEATHER_ICONS[w]}
                </span>
              ))}
            </div>

            {/* Amenities */}
            <AmenityIcons amenities={listing.amenities} maxDisplay={4} />

            {/* Meta info */}
            <div className="flex items-center gap-3 text-xs text-[var(--forest-500)]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Flagstaff
              </span>
              {listing.priceRange && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {listing.priceRange}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
