import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ActivityDetail } from '@/components/activity'
import { getActivityBySlug, getAllSlugs } from '@/lib/data'

interface ActivityPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const { slug } = await params
  const activity = getActivityBySlug(slug)

  if (!activity) {
    return {
      title: 'Activity Not Found',
    }
  }

  return {
    title: activity.name,
    description: activity.shortDescription,
    openGraph: {
      title: activity.name,
      description: activity.shortDescription,
      images: activity.images[0] ? [activity.images[0]] : undefined,
    },
  }
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params
  const activity = getActivityBySlug(slug)

  if (!activity) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ActivityDetail activity={activity} />
    </div>
  )
}
