'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { KidFriendlinessScore } from '@/components/shared/KidFriendlinessScore'
import { slideUp } from '@/lib/animations'
import type { Activity } from '@/types'

interface TopPickProps {
  activity: Activity
}

export function TopPick({ activity }: TopPickProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <Card className="overflow-hidden bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto min-h-[200px]">
              {activity.images[0] ? (
                <Image
                  src={activity.images[0]}
                  alt={activity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
                  <Star className="h-16 w-16 text-yellow-400" />
                </div>
              )}
              <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Top Pick
              </Badge>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold">{activity.name}</h3>
                <KidFriendlinessScore score={activity.kidFriendlinessScore} />
              </div>

              <p className="text-muted-foreground mb-4">
                {activity.shortDescription}
              </p>

              {activity.topPickReason && (
                <p className="text-sm bg-yellow-100 text-yellow-800 p-3 rounded-md mb-4">
                  <strong>Why we love it:</strong> {activity.topPickReason}
                </p>
              )}

              <Link href={`/activity/${activity.slug}`}>
                <Button>
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
