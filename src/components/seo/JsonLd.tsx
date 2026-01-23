import {
  Activity,
  isEatActivity,
  isHikeActivity,
  isPlayActivity,
  isLearnActivity,
  isShopActivity,
} from '@/types'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kid Friendly Flagstaff',
    url: 'https://kidfriendlyflagstaff.com',
    logo: 'https://kidfriendlyflagstaff.com/icon.svg',
    description:
      'Your family guide to kid-friendly activities, restaurants, hikes, and more in Flagstaff, Arizona.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Flagstaff',
      addressRegion: 'AZ',
      addressCountry: 'US',
    },
  }

  return <JsonLd data={data} />
}

export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kid Friendly Flagstaff',
    url: 'https://kidfriendlyflagstaff.com',
    description:
      'Discover the best kid-friendly activities, restaurants, hikes, and more in Flagstaff, Arizona.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kidfriendlyflagstaff.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={data} />
}

function getAddressSchema(address: string) {
  // Parse address into components (simplified - assumes Flagstaff, AZ format)
  return {
    '@type': 'PostalAddress',
    streetAddress: address.split(',')[0]?.trim() || address,
    addressLocality: 'Flagstaff',
    addressRegion: 'AZ',
    addressCountry: 'US',
  }
}

function getGeoSchema(coordinates?: { lat: number; lng: number }) {
  if (!coordinates) return undefined
  return {
    '@type': 'GeoCoordinates',
    latitude: coordinates.lat,
    longitude: coordinates.lng,
  }
}

export function ActivityJsonLd({ activity }: { activity: Activity }) {
  const baseData = {
    '@context': 'https://schema.org',
    name: activity.name,
    description: activity.description,
    address: getAddressSchema(activity.address),
    geo: getGeoSchema(activity.coordinates),
    image: activity.images[0],
    url: `https://kidfriendlyflagstaff.com/activity/${activity.slug}`,
    ...(activity.phone && { telephone: activity.phone }),
    ...(activity.website && { sameAs: activity.website }),
  }

  // Restaurant schema for eat category
  if (isEatActivity(activity)) {
    const data = {
      ...baseData,
      '@type': 'Restaurant',
      servesCuisine: activity.cuisine,
      priceRange: activity.priceRange || '$$',
      ...(activity.hours && { openingHours: activity.hours }),
      acceptsReservations: activity.features.includes('reservations'),
      menu: activity.website,
    }
    return <JsonLd data={data} />
  }

  // Park schema for play category
  if (isPlayActivity(activity)) {
    const data = {
      ...baseData,
      '@type': activity.playType === 'playground' ? 'Playground' : 'LocalBusiness',
      ...(activity.hours && { openingHours: activity.hours }),
      publicAccess: true,
    }
    return <JsonLd data={data} />
  }

  // Place schema for hike category
  if (isHikeActivity(activity)) {
    const data = {
      ...baseData,
      '@type': 'Place',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Distance',
          value: activity.distance,
        },
        {
          '@type': 'PropertyValue',
          name: 'Difficulty',
          value: activity.difficulty,
        },
        ...(activity.elevationGain
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Elevation Gain',
                value: activity.elevationGain,
              },
            ]
          : []),
      ],
    }
    return <JsonLd data={data} />
  }

  // TouristAttraction schema for learn category
  if (isLearnActivity(activity)) {
    const data = {
      ...baseData,
      '@type': 'TouristAttraction',
      touristType: 'Family',
      ...(activity.hours && { openingHours: activity.hours }),
      isAccessibleForFree: !activity.admissionRequired,
    }
    return <JsonLd data={data} />
  }

  // LocalBusiness schema for shop category
  if (isShopActivity(activity)) {
    const data = {
      ...baseData,
      '@type': 'Store',
      priceRange: activity.priceRange || '$$',
      ...(activity.hours && { openingHours: activity.hours }),
    }
    return <JsonLd data={data} />
  }

  // Fallback to generic LocalBusiness
  return (
    <JsonLd
      data={{
        ...baseData,
        '@type': 'LocalBusiness',
      }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}
