'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KidFriendlinessScore } from '@/components/shared/KidFriendlinessScore'
import { AmenityIcons } from './AmenityIcons'
import { AGE_DISPLAY_NAMES, WEATHER_ICONS } from '@/utils/constants'
import { cardHover, staggerItem } from '@/lib/animations'
import type { Activity } from '@/types'

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      {...cardHover}
      className="h-full"
    >
      <Link href={`/activity/${activity.slug}`}>
        <Card className="h-full overflow-hidden activity-card cursor-pointer">
          {/* Image */}
          <div className="relative aspect-video bg-muted">
            {activity.images[0] ? (
              <Image
                src={activity.images[0]}
                alt={activity.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
                <span className="text-4xl">
                  {activity.category === 'play' && '🎪'}
                  {activity.category === 'hike' && '🥾'}
                  {activity.category === 'eat' && '🍕'}
                  {activity.category === 'explore' && '🔭'}
                  {activity.category === 'shop' && '🛍️'}
                </span>
              </div>
            )}
            {activity.isTopPick && (
              <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                Top Pick
              </Badge>
            )}
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg line-clamp-2">{activity.name}</CardTitle>
              <KidFriendlinessScore score={activity.kidFriendlinessScore} size="sm" />
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Short description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {activity.shortDescription}
            </p>

            {/* Age ranges */}
            <div className="flex flex-wrap gap-1">
              {activity.ageRanges.slice(0, 3).map((age) => (
                <Badge key={age} variant="secondary" className="text-xs">
                  {AGE_DISPLAY_NAMES[age]}
                </Badge>
              ))}
              {activity.ageRanges.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{activity.ageRanges.length - 3}
                </Badge>
              )}
            </div>

            {/* Weather icons */}
            <div className="flex items-center gap-1">
              {activity.weather.map((w) => (
                <span key={w} title={w} className="text-sm">
                  {WEATHER_ICONS[w]}
                </span>
              ))}
            </div>

            {/* Amenities */}
            <AmenityIcons amenities={activity.amenities} maxDisplay={4} />

            {/* Meta info */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Flagstaff
              </span>
              {activity.priceRange && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {activity.priceRange}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
