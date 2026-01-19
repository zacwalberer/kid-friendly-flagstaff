import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/providers/Providers'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Kid Friendly Flagstaff',
    template: '%s | Kid Friendly Flagstaff',
  },
  description:
    'Discover the best kid-friendly activities, restaurants, hikes, and more in Flagstaff, Arizona. Your family guide to fun in the mountains.',
  keywords: [
    'Flagstaff',
    'Arizona',
    'kids',
    'family',
    'activities',
    'restaurants',
    'hikes',
    'playgrounds',
  ],
  authors: [{ name: 'Kid Friendly Flagstaff' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kidfriendlyflagstaff.com',
    siteName: 'Kid Friendly Flagstaff',
    title: 'Kid Friendly Flagstaff',
    description:
      'Discover the best kid-friendly activities, restaurants, hikes, and more in Flagstaff, Arizona.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kid Friendly Flagstaff',
    description:
      'Discover the best kid-friendly activities, restaurants, hikes, and more in Flagstaff, Arizona.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
