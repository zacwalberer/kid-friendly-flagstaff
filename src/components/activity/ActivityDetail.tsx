'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Globe,
  Clock,
  DollarSign,
  ArrowLeft,
  Navigation,
  Lightbulb,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { KidFriendlinessScore } from '@/components/shared/KidFriendlinessScore'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { AmenityIcons } from './AmenityIcons'
import {
  AGE_DISPLAY_NAMES,
  WEATHER_ICONS,
  WEATHER_LABELS,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
  SURFACE_LABELS,
  MEAL_TYPE_LABELS,
  EAT_FEATURE_LABELS,
  getCategoryInfo,
} from '@/utils/constants'
import { formatDistance, formatElevation, formatDuration } from '@/utils/formatDistance'
import { slideUp, fadeIn, staggerContainer, staggerItem } from '@/lib/animations'
import type { Activity } from '@/types'
import * as ActivityTypes from '@/types/activity'

interface ActivityDetailProps {
  activity: Activity
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
  const categoryInfo = getCategoryInfo(activity.category)

  const openInMaps = () => {
    const query = encodeURIComponent(activity.address)
    window.open(`https://maps.google.com?q=${query}`, '_blank')
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-4xl mx-auto"
    >
      {/* Back link */}
      <motion.div variants={slideUp} className="mb-6">
        <Link href={`/${activity.category}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {categoryInfo.name}
          </Button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={slideUp} className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{categoryInfo.name}</Badge>
              {activity.isTopPick && (
                <Badge className="bg-yellow-500 text-white">Top Pick</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{activity.name}</h1>
            <KidFriendlinessScore
              score={activity.kidFriendlinessScore}
              size="lg"
              showLabel
            />
          </div>
          <ShareButtons title={activity.name} />
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        variants={slideUp}
        className="relative aspect-video rounded-lg overflow-hidden mb-8 bg-muted"
      >
        {activity.images[0] ? (
          <Image
            src={activity.images[0]}
            alt={activity.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
            <span className="text-6xl">
              {activity.category === 'play' && '🎪'}
              {activity.category === 'hike' && '🥾'}
              {activity.category === 'eat' && '🍕'}
              {activity.category === 'explore' && '🔭'}
              {activity.category === 'shop' && '🛍️'}
            </span>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <motion.div variants={staggerContainer} className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category-specific details */}
          {ActivityTypes.isHikeActivity(activity) && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle>Trail Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium">{formatDistance(activity.distance)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Difficulty</p>
                      <Badge className={DIFFICULTY_COLORS[activity.difficulty]}>
                        {DIFFICULTY_LABELS[activity.difficulty]}
                      </Badge>
                    </div>
                    {activity.elevationGain && (
                      <div>
                        <p className="text-sm text-muted-foreground">Elevation Gain</p>
                        <p className="font-medium">
                          {formatElevation(activity.elevationGain)}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Surface</p>
                      <p className="font-medium">{SURFACE_LABELS[activity.surface]}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-4">
                    <Badge variant={activity.isStrollerFriendly ? 'default' : 'secondary'}>
                      {activity.isStrollerFriendly
                        ? 'Stroller Friendly'
                        : 'Not Stroller Friendly'}
                    </Badge>
                    <Badge variant={activity.isLoop ? 'default' : 'secondary'}>
                      {activity.isLoop ? 'Loop Trail' : 'Out and Back'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {ActivityTypes.isEatActivity(activity) && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Cuisine</p>
                    <p className="font-medium">{activity.cuisine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Meal Types</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.mealTypes.map((meal) => (
                        <Badge key={meal} variant="secondary">
                          {MEAL_TYPE_LABELS[meal]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.features.map((feature) => (
                        <Badge key={feature} variant="outline">
                          {EAT_FEATURE_LABELS[feature]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {ActivityTypes.isExploreActivity(activity) && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle>Attraction Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{formatDuration(activity.duration)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Admission</p>
                      <p className="font-medium">
                        {activity.admissionRequired ? 'Required' : 'Free'}
                      </p>
                    </div>
                  </div>
                  {activity.advanceBooking && (
                    <Badge variant="outline">Advance Booking Recommended</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Tips */}
          {activity.tips && activity.tips.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Tips from Parents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activity.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-500">•</span>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={staggerContainer} className="space-y-6">
          {/* Quick info */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{activity.address}</p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={openInMaps}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Get Directions
                    </Button>
                  </div>
                </div>

                {/* Hours */}
                {activity.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hours</p>
                      <p className="font-medium">{activity.hours}</p>
                    </div>
                  </div>
                )}

                {/* Price */}
                {activity.priceRange && (
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Price Range</p>
                      <p className="font-medium">{activity.priceRange}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {activity.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${activity.phone}`}
                        className="font-medium hover:underline"
                      >
                        {activity.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Website */}
                {activity.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a
                        href={activity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Age ranges */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle>Best For Ages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {activity.ageRanges.map((age) => (
                    <Badge key={age} variant="secondary">
                      {AGE_DISPLAY_NAMES[age]}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle>Great For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {activity.weather.map((w) => (
                    <div key={w} className="flex items-center gap-1">
                      <span className="text-lg">{WEATHER_ICONS[w]}</span>
                      <span className="text-sm">{WEATHER_LABELS[w]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Amenities */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <AmenityIcons amenities={activity.amenities} showLabels />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
