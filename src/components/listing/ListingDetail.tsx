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
  Star,
  Tent,
  Footprints,
  UtensilsCrossed,
  GraduationCap,
  ShoppingBag,
  type LucideIcon,
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
  SURFACE_LABELS,
  MEAL_TYPE_LABELS,
  EAT_FEATURE_LABELS,
  ACCESSIBILITY_LABELS,
  ACCESSIBILITY_ICONS,
  SETTING_LABELS,
  SHADE_COVERAGE_LABELS,
  HIKE_TYPE_LABELS,
  getCategoryInfo,
} from '@/utils/constants'
import { formatDistance, formatElevation, formatDuration } from '@/utils/formatDistance'
import { slideUp, fadeIn, staggerContainer, staggerItem } from '@/lib/animations'
import type { Listing } from '@/types'
import * as ListingTypes from '@/types/listing'

interface ListingDetailProps {
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

const DIFFICULTY_FOREST_COLORS: Record<string, string> = {
  easy: 'bg-[var(--forest-100)] text-[var(--forest-700)]',
  moderate: 'bg-[var(--aspen-300)] text-[var(--forest-900)]',
  hard: 'bg-[var(--bark-400)] text-white',
}

export function ListingDetail({ listing }: ListingDetailProps) {
  const categoryInfo = getCategoryInfo(listing.category)
  const Icon = CATEGORY_ICONS[listing.category]

  const openInMaps = () => {
    const query = encodeURIComponent(listing.address)
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
        <Link href={`/${listing.category}`}>
          <Button variant="ghost" size="sm" className="text-[var(--forest-600)] hover:text-[var(--forest-800)] hover:bg-[var(--forest-100)]">
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
              <Badge variant="secondary" className="bg-[var(--forest-100)] text-[var(--forest-700)] border-0 flex items-center gap-1">
                {Icon && <Icon className="h-3 w-3" />}
                {categoryInfo.name}
              </Badge>
              {listing.isTopPick && (
                <Badge className="top-pick-badge">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Top Pick
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-[var(--forest-800)]">
              {listing.name}
            </h1>
            <KidFriendlinessScore
              score={listing.kidFriendlinessScore}
              size="lg"
              showLabel
            />
          </div>
          <ShareButtons title={listing.name} />
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        variants={slideUp}
        className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-[var(--cream-200)] shadow-forest-lg"
      >
        {listing.images[0] ? (
          <Image
            src={listing.images[0]}
            alt={listing.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${CATEGORY_GRADIENTS[listing.category]}`}>
            {Icon && <Icon className="h-20 w-20 text-white/80" strokeWidth={1.5} />}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <motion.div variants={staggerContainer} className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.div variants={staggerItem}>
            <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
              <CardHeader>
                <CardTitle className="font-display text-[var(--forest-800)]">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--forest-600)] leading-relaxed">
                  {listing.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category-specific details */}
          {ListingTypes.isHikeListing(listing) && (
            <motion.div variants={staggerItem}>
              <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
                <CardHeader>
                  <CardTitle className="font-display text-[var(--forest-800)] flex items-center gap-2">
                    <Footprints className="h-5 w-5 text-[var(--category-hike)]" />
                    Trail Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Distance</p>
                      <p className="font-display font-medium text-[var(--forest-800)]">{formatDistance(listing.distance)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Difficulty</p>
                      <Badge className={DIFFICULTY_FOREST_COLORS[listing.difficulty]}>
                        {DIFFICULTY_LABELS[listing.difficulty]}
                      </Badge>
                    </div>
                    {listing.elevationGain && (
                      <div>
                        <p className="text-sm text-[var(--forest-500)]">Elevation Gain</p>
                        <p className="font-display font-medium text-[var(--forest-800)]">
                          {formatElevation(listing.elevationGain)}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Surface</p>
                      <p className="font-display font-medium text-[var(--forest-800)]">{SURFACE_LABELS[listing.surface]}</p>
                    </div>
                  </div>
                  <Separator className="bg-[var(--cream-300)]" />
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="secondary" className="bg-[var(--cream-200)] text-[var(--forest-600)]">
                      {HIKE_TYPE_LABELS[listing.hikeType]}
                    </Badge>
                    {listing.shadeCoverage && (
                      <Badge variant="secondary" className="bg-[var(--cream-200)] text-[var(--forest-600)]">
                        {SHADE_COVERAGE_LABELS[listing.shadeCoverage]}
                      </Badge>
                    )}
                    {listing.duration && (
                      <Badge variant="secondary" className="bg-[var(--cream-200)] text-[var(--forest-600)]">
                        {formatDuration(listing.duration)}
                      </Badge>
                    )}
                  </div>
                  {listing.features && listing.features.length > 0 && (
                    <>
                      <Separator className="bg-[var(--cream-300)]" />
                      <div>
                        <p className="text-sm text-[var(--forest-500)] mb-2">Features</p>
                        <div className="flex flex-wrap gap-2">
                          {listing.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="border-[var(--cream-300)] text-[var(--forest-600)]">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {ListingTypes.isEatListing(listing) && (
            <motion.div variants={staggerItem}>
              <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
                <CardHeader>
                  <CardTitle className="font-display text-[var(--forest-800)] flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-[var(--category-eat)]" />
                    Restaurant Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-[var(--forest-500)] mb-2">Cuisine</p>
                    <p className="font-display font-medium text-[var(--forest-800)]">{listing.cuisine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--forest-500)] mb-2">Meal Types</p>
                    <div className="flex flex-wrap gap-2">
                      {listing.mealTypes.map((meal) => (
                        <Badge key={meal} variant="secondary" className="bg-[var(--forest-100)] text-[var(--forest-700)]">
                          {MEAL_TYPE_LABELS[meal]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--forest-500)] mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {listing.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="border-[var(--cream-300)] text-[var(--forest-600)]">
                          {EAT_FEATURE_LABELS[feature]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {ListingTypes.isLearnListing(listing) && (
            <motion.div variants={staggerItem}>
              <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
                <CardHeader>
                  <CardTitle className="font-display text-[var(--forest-800)] flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-[var(--category-learn)]" />
                    Attraction Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Setting</p>
                      <p className="font-display font-medium text-[var(--forest-800)]">{SETTING_LABELS[listing.setting]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Admission</p>
                      <p className="font-display font-medium text-[var(--forest-800)]">
                        {listing.admissionRequired ? 'Required' : 'Free'}
                      </p>
                    </div>
                  </div>
                  {listing.advanceBooking && (
                    <Badge variant="outline" className="border-[var(--aspen-400)] text-[var(--forest-700)] bg-[var(--aspen-300)]/30">
                      Advance Booking Recommended
                    </Badge>
                  )}
                  {listing.features && listing.features.length > 0 && (
                    <>
                      <Separator className="bg-[var(--cream-300)]" />
                      <div>
                        <p className="text-sm text-[var(--forest-500)] mb-2">Features</p>
                        <div className="flex flex-wrap gap-2">
                          {listing.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="border-[var(--cream-300)] text-[var(--forest-600)]">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {ListingTypes.isPlayListing(listing) && (
            <motion.div variants={staggerItem}>
              <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
                <CardHeader>
                  <CardTitle className="font-display text-[var(--forest-800)] flex items-center gap-2">
                    <Tent className="h-5 w-5 text-[var(--category-play)]" />
                    Play Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Setting</p>
                      <p className="font-display font-medium text-[var(--forest-800)]">{SETTING_LABELS[listing.setting]}</p>
                    </div>
                    {listing.hasFencedArea !== undefined && (
                      <div>
                        <p className="text-sm text-[var(--forest-500)]">Fenced Area</p>
                        <p className="font-display font-medium text-[var(--forest-800)]">
                          {listing.hasFencedArea ? 'Yes' : 'No'}
                        </p>
                      </div>
                    )}
                  </div>
                  {listing.features && listing.features.length > 0 && (
                    <>
                      <Separator className="bg-[var(--cream-300)]" />
                      <div>
                        <p className="text-sm text-[var(--forest-500)] mb-2">Features</p>
                        <div className="flex flex-wrap gap-2">
                          {listing.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="border-[var(--cream-300)] text-[var(--forest-600)]">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {ListingTypes.isShopListing(listing) && listing.features && listing.features.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
                <CardHeader>
                  <CardTitle className="font-display text-[var(--forest-800)] flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[var(--category-shop)]" />
                    Shop Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-[var(--forest-500)] mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {listing.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="border-[var(--cream-300)] text-[var(--forest-600)]">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Tips */}
          {listing.tips && listing.tips.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card className="border-[var(--aspen-300)] bg-gradient-to-br from-[var(--aspen-300)]/20 to-[var(--cream-100)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-[var(--forest-800)]">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--aspen-400)]">
                      <Lightbulb className="h-4 w-4 text-[var(--forest-900)]" />
                    </div>
                    Tips from Parents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {listing.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[var(--aspen-500)] mt-1">•</span>
                        <span className="text-[var(--forest-600)]">{tip}</span>
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
            <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
              <CardHeader>
                <CardTitle className="font-display text-[var(--forest-800)]">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[var(--forest-500)] mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--forest-800)]">{listing.address}</p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-[var(--forest-500)] hover:text-[var(--forest-700)]"
                      onClick={openInMaps}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Get Directions
                    </Button>
                  </div>
                </div>

                {/* Hours */}
                {listing.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[var(--forest-500)] mt-0.5" />
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Hours</p>
                      <p className="font-medium text-[var(--forest-800)]">{listing.hours}</p>
                    </div>
                  </div>
                )}

                {/* Price */}
                {listing.priceRange && (
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-[var(--forest-500)] mt-0.5" />
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Price Range</p>
                      <p className="font-medium text-[var(--forest-800)]">{listing.priceRange}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {listing.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[var(--forest-500)] mt-0.5" />
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Phone</p>
                      <a
                        href={`tel:${listing.phone}`}
                        className="font-medium text-[var(--forest-800)] hover:text-[var(--forest-600)] hover:underline"
                      >
                        {listing.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Website */}
                {listing.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[var(--forest-500)] mt-0.5" />
                    <div>
                      <p className="text-sm text-[var(--forest-500)]">Website</p>
                      <a
                        href={listing.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--forest-800)] hover:text-[var(--forest-600)] hover:underline break-all"
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
            <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
              <CardHeader>
                <CardTitle className="font-display text-[var(--forest-800)]">Best For Ages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {listing.ageRanges.map((age) => (
                    <Badge key={age} variant="secondary" className="bg-[var(--forest-100)] text-[var(--forest-700)]">
                      {AGE_DISPLAY_NAMES[age]}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather */}
          <motion.div variants={staggerItem}>
            <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
              <CardHeader>
                <CardTitle className="font-display text-[var(--forest-800)]">Great For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {listing.weather.map((w) => (
                    <div key={w} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--cream-200)]">
                      <span className="text-lg">{WEATHER_ICONS[w]}</span>
                      <span className="text-sm text-[var(--forest-700)]">{WEATHER_LABELS[w]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Amenities */}
          <motion.div variants={staggerItem}>
            <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
              <CardHeader>
                <CardTitle className="font-display text-[var(--forest-800)]">Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <AmenityIcons amenities={listing.amenities} showLabels />
              </CardContent>
            </Card>
          </motion.div>

          {/* Accessibility */}
          {listing.accessibility && listing.accessibility.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card className="border-[var(--cream-300)] bg-[var(--cream-100)]">
                <CardHeader>
                  <CardTitle className="font-display text-[var(--forest-800)]">Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {listing.accessibility.map((a) => (
                      <div key={a} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--forest-100)]">
                        <span className="text-lg">{ACCESSIBILITY_ICONS[a]}</span>
                        <span className="text-sm text-[var(--forest-700)]">{ACCESSIBILITY_LABELS[a]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
