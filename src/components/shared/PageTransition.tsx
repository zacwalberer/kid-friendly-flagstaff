'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { pageTransition } from '@/lib/animations'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  )
}
