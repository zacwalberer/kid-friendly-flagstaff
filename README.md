# Kid Friendly Flagstaff

A responsive, mobile-first website helping parents find kid-friendly activities in Flagstaff, Arizona.

## Features

- **5 Activity Categories**: Play, Hike, Eat, Explore, Shop
- **Smart Filtering**: Filter by age range, weather conditions, amenities, and category-specific attributes
- **Kid Friendliness Scores**: 1-5 ratings for each activity
- **Mobile-First Design**: Optimized for parents on-the-go
- **Favorites**: Save activities to your favorites (stored locally)
- **Share Links**: Easy sharing to help other families

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animation**: Framer Motion
- **Icons**: lucide-react
- **Testing**: Vitest + React Testing Library
- **Data**: JSON files (MVP approach)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kff

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
```

## Project Structure

```
kff/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (categories)/       # Category pages (play, hike, eat, explore, shop)
│   │   ├── activity/[slug]/    # Activity detail pages
│   │   ├── api/                # API routes
│   │   └── ...
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── activity/           # Activity cards, grids, details
│   │   ├── filters/            # Filter components
│   │   ├── home/               # Homepage components
│   │   └── shared/             # Shared components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Data loading, utilities
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── data/
│   └── activities/             # JSON data files
├── __tests__/                  # Test files
└── public/                     # Static assets
```

## Activity Categories

### Play
Playgrounds, indoor play areas, and recreational facilities suitable for children.
- **Filters**: Play type, age range, weather, amenities

### Hike
Family-friendly trails and nature walks around Flagstaff.
- **Filters**: Difficulty, distance, elevation gain, stroller-friendly, surface type

### Eat
Kid-friendly restaurants with amenities families need.
- **Filters**: Meal type, cuisine, features (highchairs, kids menu, etc.)

### Explore
Museums, attractions, and educational experiences.
- **Filters**: Activity type, indoor/outdoor, age range

### Shop
Family-friendly stores with items for kids.
- **Filters**: Shop type, age range

## Data Structure

Activities are stored in JSON files under `data/activities/`. Each category has its own file with category-specific fields.

See [CONTENT.md](./CONTENT.md) for details on adding or editing activities.

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

## Deployment

This project is configured for deployment on Vercel.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Plans

See [FUTURE.md](./FUTURE.md) for planned features and roadmap.

## License

MIT
