import {
  Listing,
  isEatListing,
  isHikeListing,
  isPlayListing,
  isLearnListing,
  isShopListing,
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

export function ListingJsonLd({ listing }: { listing: Listing }) {
  const baseData = {
    '@context': 'https://schema.org',
    name: listing.name,
    description: listing.description,
    address: getAddressSchema(listing.address),
    geo: getGeoSchema(listing.coordinates),
    image: listing.images[0],
    url: `https://kidfriendlyflagstaff.com/listing/${listing.slug}`,
    ...(listing.phone && { telephone: listing.phone }),
    ...(listing.website && { sameAs: listing.website }),
  }

  // Restaurant schema for eat category
  if (isEatListing(listing)) {
    const data = {
      ...baseData,
      '@type': 'Restaurant',
      servesCuisine: listing.cuisine,
      priceRange: listing.priceRange || '$$',
      ...(listing.hours && { openingHours: listing.hours }),
      acceptsReservations: listing.features.includes('reservations'),
      menu: listing.website,
    }
    return <JsonLd data={data} />
  }

  // Park schema for play category
  if (isPlayListing(listing)) {
    const data = {
      ...baseData,
      '@type': listing.playType === 'playground' ? 'Playground' : 'LocalBusiness',
      ...(listing.hours && { openingHours: listing.hours }),
      publicAccess: true,
    }
    return <JsonLd data={data} />
  }

  // Place schema for hike category
  if (isHikeListing(listing)) {
    const data = {
      ...baseData,
      '@type': 'Place',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Distance',
          value: listing.distance,
        },
        {
          '@type': 'PropertyValue',
          name: 'Difficulty',
          value: listing.difficulty,
        },
        ...(listing.elevationGain
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Elevation Gain',
                value: listing.elevationGain,
              },
            ]
          : []),
      ],
    }
    return <JsonLd data={data} />
  }

  // TouristAttraction schema for learn category
  if (isLearnListing(listing)) {
    const data = {
      ...baseData,
      '@type': 'TouristAttraction',
      touristType: 'Family',
      ...(listing.hours && { openingHours: listing.hours }),
      isAccessibleForFree: !listing.admissionRequired,
    }
    return <JsonLd data={data} />
  }

  // LocalBusiness schema for shop category
  if (isShopListing(listing)) {
    const data = {
      ...baseData,
      '@type': 'Store',
      priceRange: listing.priceRange || '$$',
      ...(listing.hours && { openingHours: listing.hours }),
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
