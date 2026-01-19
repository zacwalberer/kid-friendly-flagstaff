# Content Guide

This guide explains how to add, edit, and manage activities in Kid Friendly Flagstaff.

## Data Location

Activity data is stored in JSON files under `data/activities/`:

```
data/activities/
├── play.json      # Playgrounds and play areas
├── hike.json      # Hiking trails
├── eat.json       # Restaurants
├── explore.json   # Attractions and museums
└── shop.json      # Family-friendly stores
```

## Common Fields

All activities share these base fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (e.g., "thorpe-park") |
| `slug` | string | Yes | URL-friendly name (same as id) |
| `name` | string | Yes | Display name |
| `category` | string | Yes | One of: play, hike, eat, explore, shop |
| `description` | string | Yes | Full description (2-4 sentences) |
| `shortDescription` | string | Yes | Brief description (1 sentence) |
| `address` | string | Yes | Full street address |
| `kidFriendlinessScore` | number | Yes | Rating 1-5 |
| `ageRanges` | array | Yes | Array of age ranges |
| `weather` | array | Yes | Suitable weather conditions |
| `amenities` | array | Yes | Available amenities |
| `images` | array | Yes | Image URLs (can be empty) |
| `lastUpdated` | string | Yes | ISO date string |

### Age Ranges
- `baby` (0-1 years)
- `toddler` (1-3 years)
- `preschool` (3-5 years)
- `elementary` (5-10 years)
- `tween` (10-12 years)

### Weather Conditions
- `sunny` - Good for sunny days
- `rainy` - Good for rainy days (indoor)
- `snowy` - Good for snowy days
- `cold` - Good for cold weather

### Common Amenities
- `restrooms`
- `shade`
- `parking`
- `stroller-accessible`
- `dog-friendly`
- `water-fountain`
- `picnic-area`

## Category-Specific Fields

### Play Activities

| Field | Type | Description |
|-------|------|-------------|
| `playType` | string | Type: playground, indoor-play, recreation-center |

Example:
```json
{
  "id": "thorpe-park",
  "slug": "thorpe-park",
  "name": "Thorpe Park",
  "category": "play",
  "playType": "playground",
  "description": "Large community park with multiple playgrounds...",
  "shortDescription": "Flagstaff's premier playground destination",
  "address": "191 N Thorpe Rd, Flagstaff, AZ 86001",
  "kidFriendlinessScore": 5,
  "ageRanges": ["toddler", "preschool", "elementary"],
  "weather": ["sunny", "cold"],
  "amenities": ["restrooms", "shade", "parking", "picnic-area"],
  "images": [],
  "lastUpdated": "2024-01-15"
}
```

### Hike Activities

| Field | Type | Description |
|-------|------|-------------|
| `distance` | string | Trail distance (e.g., "1.5 miles") |
| `difficulty` | string | easy, moderate, challenging |
| `elevationGain` | string | Elevation in feet (e.g., "200 ft") |
| `estimatedTime` | string | Duration (e.g., "1-2 hours") |
| `surfaceType` | string | paved, dirt, mixed |
| `strollerFriendly` | boolean | Suitable for strollers |
| `isTopPick` | boolean | Featured as top pick |

Example:
```json
{
  "id": "buffalo-park",
  "slug": "buffalo-park",
  "name": "Buffalo Park - Nate Avery Trail",
  "category": "hike",
  "distance": "2 miles",
  "difficulty": "easy",
  "elevationGain": "100 ft",
  "estimatedTime": "1 hour",
  "surfaceType": "dirt",
  "strollerFriendly": true,
  "isTopPick": true,
  "description": "Wide, flat trail perfect for families...",
  "shortDescription": "Easy loop with mountain views",
  "address": "2400 N Gemini Dr, Flagstaff, AZ 86001",
  "kidFriendlinessScore": 5,
  "ageRanges": ["baby", "toddler", "preschool", "elementary", "tween"],
  "weather": ["sunny", "cold"],
  "amenities": ["parking", "dog-friendly", "stroller-accessible"],
  "images": [],
  "lastUpdated": "2024-01-15"
}
```

### Eat Activities

| Field | Type | Description |
|-------|------|-------------|
| `cuisine` | string | Cuisine type (american, mexican, etc.) |
| `priceRange` | string | $, $$, $$$ |
| `mealTypes` | array | breakfast, lunch, dinner |
| `features` | array | Special features (see below) |

Features options:
- `highchairs`
- `kids-menu`
- `changing-table`
- `outdoor-seating`
- `quick-service`
- `crayons-provided`
- `playground`

Example:
```json
{
  "id": "martannes-breakfast",
  "slug": "martannes-breakfast",
  "name": "MartAnne's Breakfast Palace",
  "category": "eat",
  "cuisine": "american",
  "priceRange": "$$",
  "mealTypes": ["breakfast", "lunch"],
  "features": ["highchairs", "kids-menu", "crayons-provided"],
  "description": "Beloved local breakfast spot...",
  "shortDescription": "Flagstaff's favorite breakfast spot",
  "address": "112 E Route 66, Flagstaff, AZ 86001",
  "kidFriendlinessScore": 5,
  "ageRanges": ["baby", "toddler", "preschool", "elementary", "tween"],
  "weather": ["sunny", "rainy", "snowy", "cold"],
  "amenities": ["parking", "restrooms"],
  "images": [],
  "lastUpdated": "2024-01-15"
}
```

### Explore Activities

| Field | Type | Description |
|-------|------|-------------|
| `exploreType` | string | museum, nature, attraction, science |
| `duration` | string | Typical visit duration |
| `admission` | string | Price info or "Free" |
| `reservationRequired` | boolean | Needs advance booking |

Example:
```json
{
  "id": "lowell-observatory",
  "slug": "lowell-observatory",
  "name": "Lowell Observatory",
  "category": "explore",
  "exploreType": "science",
  "duration": "2-3 hours",
  "admission": "$17 adults, $10 kids",
  "reservationRequired": false,
  "description": "Historic observatory where Pluto was discovered...",
  "shortDescription": "World-famous observatory with family programs",
  "address": "1400 W Mars Hill Rd, Flagstaff, AZ 86001",
  "kidFriendlinessScore": 5,
  "ageRanges": ["preschool", "elementary", "tween"],
  "weather": ["sunny", "cold"],
  "amenities": ["restrooms", "parking", "stroller-accessible"],
  "images": [],
  "lastUpdated": "2024-01-15"
}
```

### Shop Activities

| Field | Type | Description |
|-------|------|-------------|
| `shopType` | string | bookstore, resale, toy-store, general |

Example:
```json
{
  "id": "bright-side-bookshop",
  "slug": "bright-side-bookshop",
  "name": "Bright Side Bookshop",
  "category": "shop",
  "shopType": "bookstore",
  "description": "Charming independent bookstore...",
  "shortDescription": "Beloved local bookstore with great kids section",
  "address": "18 N San Francisco St, Flagstaff, AZ 86001",
  "kidFriendlinessScore": 5,
  "ageRanges": ["toddler", "preschool", "elementary", "tween"],
  "weather": ["sunny", "rainy", "snowy", "cold"],
  "amenities": ["stroller-accessible"],
  "images": [],
  "lastUpdated": "2024-01-15"
}
```

## Adding a New Activity

1. Open the appropriate JSON file in `data/activities/`
2. Add a new object to the array with all required fields
3. Ensure the `id` and `slug` are unique
4. Run `npm run build` to verify no errors
5. Test locally with `npm run dev`

## Editing an Activity

1. Find the activity by `id` in the appropriate JSON file
2. Update the desired fields
3. Update `lastUpdated` to current date
4. Run `npm run build` to verify no errors

## Best Practices

1. **Unique IDs**: Use lowercase, hyphenated names (e.g., "thorpe-park")
2. **Descriptions**: Keep short descriptions under 100 characters
3. **Scores**: Be consistent with kid-friendliness ratings
4. **Images**: Add image URLs when available (future feature)
5. **Dates**: Use ISO format for lastUpdated (YYYY-MM-DD)

## Validation

The TypeScript types in `src/types/activity.ts` define the expected structure. The build will fail if data doesn't match the expected types.

Run these commands to validate:

```bash
npm run build  # TypeScript will catch type errors
npm run lint   # ESLint will catch syntax issues
```
