import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/components/listing'
import { getListingBySlug, getAllSlugs } from '@/lib/data'
import { ListingJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

interface ListingPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) {
    return {
      title: 'Listing Not Found',
    }
  }

  return {
    title: listing.name,
    description: listing.shortDescription,
    alternates: {
      canonical: `/listing/${listing.slug}`,
    },
    openGraph: {
      title: `${listing.name} | Kid Friendly Flagstaff`,
      description: listing.shortDescription,
      url: `/listing/${listing.slug}`,
      images: listing.images[0] ? [listing.images[0]] : undefined,
      type: 'article',
    },
  }
}

const categoryNames: Record<string, string> = {
  play: 'Play',
  hike: 'Hike',
  eat: 'Eat',
  learn: 'Learn',
  shop: 'Shop',
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://kidfriendlyflagstaff.com' },
    {
      name: categoryNames[listing.category] || listing.category,
      url: `https://kidfriendlyflagstaff.com/${listing.category}`,
    },
    {
      name: listing.name,
      url: `https://kidfriendlyflagstaff.com/listing/${listing.slug}`,
    },
  ]

  return (
    <>
      <ListingJsonLd listing={listing} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="container mx-auto px-4 py-8">
        <ListingDetail listing={listing} />
      </div>
    </>
  )
}
