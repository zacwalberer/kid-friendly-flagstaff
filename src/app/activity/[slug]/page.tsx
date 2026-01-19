import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ActivityDetail } from '@/components/activity'
import { getActivityBySlug, getAllSlugs } from '@/lib/data'
import { ActivityJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

interface ActivityPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)

  if (!activity) {
    return {
      title: 'Activity Not Found',
    }
  }

  return {
    title: activity.name,
    description: activity.shortDescription,
    alternates: {
      canonical: `/activity/${activity.slug}`,
    },
    openGraph: {
      title: `${activity.name} | Kid Friendly Flagstaff`,
      description: activity.shortDescription,
      url: `/activity/${activity.slug}`,
      images: activity.images[0] ? [activity.images[0]] : undefined,
      type: 'article',
    },
  }
}

const categoryNames: Record<string, string> = {
  play: 'Play',
  hike: 'Hike',
  eat: 'Eat',
  explore: 'Explore',
  shop: 'Shop',
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)

  if (!activity) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://kidfriendlyflagstaff.com' },
    {
      name: categoryNames[activity.category] || activity.category,
      url: `https://kidfriendlyflagstaff.com/${activity.category}`,
    },
    {
      name: activity.name,
      url: `https://kidfriendlyflagstaff.com/activity/${activity.slug}`,
    },
  ]

  return (
    <>
      <ActivityJsonLd activity={activity} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="container mx-auto px-4 py-8">
        <ActivityDetail activity={activity} />
      </div>
    </>
  )
}
