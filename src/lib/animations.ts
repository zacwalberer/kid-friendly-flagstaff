import type { Variants } from 'framer-motion'

// Organic easing curves for a natural, forest-inspired feel
const organicEase = [0.22, 1, 0.36, 1] as const // Custom bezier for smooth, organic motion
const gentleEase = [0.4, 0, 0.2, 1] as const // Material design standard easing

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: gentleEase },
  },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: organicEase },
  },
}

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: organicEase },
  },
}

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: organicEase },
  },
}

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: organicEase },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: gentleEase,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: organicEase },
  },
}

// Soft, organic hover effect
export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.25, ease: organicEase },
}

// Card hover with forest-tinted shadow
export const cardHover = {
  whileHover: {
    y: -6,
    transition: { duration: 0.3, ease: organicEase },
  },
  whileTap: {
    y: -2,
    transition: { duration: 0.15 },
  },
}

export const filterPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: gentleEase },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: organicEase },
  },
}

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: gentleEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: gentleEase },
  },
}

// Gentle floating animation for decorative elements
export const floatAnimation: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: organicEase,
    },
  },
}

// Soft pulse for attention-grabbing elements
export const gentlePulse = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

// Reduced motion variants (for accessibility)
export const reducedMotionFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
}
