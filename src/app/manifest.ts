import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kid Friendly Flagstaff',
    short_name: 'KFF',
    description:
      'Your family guide to kid-friendly activities, restaurants, hikes, and more in Flagstaff, Arizona.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#047857',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
