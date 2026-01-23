# Airtable Setup Guide

This guide walks through setting up Airtable as the CMS for managing Kid Friendly Flagstaff listings.

## Quick Start

1. Create an Airtable account at [airtable.com](https://airtable.com)
2. Create a new base with a "Listings" table
3. Configure fields (see schema below)
4. Create an API token
5. Add environment variables
6. Set up auto-rebuild webhook (optional)

## Step 1: Create the Airtable Base

1. Log into Airtable and click "Create a base"
2. Name it "Kid Friendly Flagstaff"
3. Rename the default table to "Listings"

## Step 2: Configure Table Fields

Set up the following fields in your Listings table:

### Core Fields (Required)

| Field Name | Type | Notes |
|------------|------|-------|
| `name` | Single line text | Listing name |
| `slug` | Single line text | URL-safe identifier (e.g., "thorpe-park") |
| `category` | Single select | play, hike, eat, learn, shop |
| `description` | Long text | Full description |
| `shortDescription` | Single line text | Brief summary for cards |
| `address` | Single line text | Street address |
| `status` | Single select | Draft, Published, Archived |

### Contact & Hours

| Field Name | Type | Notes |
|------------|------|-------|
| `phone` | Phone number | Optional |
| `website` | URL | Optional |
| `hours` | Single line text | e.g., "Mon-Fri 9am-5pm" |
| `priceRange` | Multiple select | Free, $, $$, $$$ |

### Ratings & Tags

| Field Name | Type | Notes |
|------------|------|-------|
| `kidFriendlinessScore` | Rating (1-5 stars) | Kid-friendliness rating |
| `ageRanges` | Multiple select | baby, toddler, preschool, elementary, tween |
| `weather` | Multiple select | sunny, rainy, snowy, cold |
| `amenities` | Multiple select | restrooms, changing-tables, parking, dog-friendly |
| `accessibility` | Multiple select | wheelchair, stroller |

### Media & Featured

| Field Name | Type | Notes |
|------------|------|-------|
| `images` | Attachment | Upload images directly |
| `isTopPick` | Checkbox | Featured listing |
| `topPickReason` | Long text | Why it's a top pick |
| `tips` | Long text | Comma-separated tips |

### Location

| Field Name | Type | Notes |
|------------|------|-------|
| `latitude` | Number | Decimal format |
| `longitude` | Number | Decimal format |
| `lastUpdated` | Date | When listing was last updated |

### Category-Specific Fields

#### Play
| Field Name | Type | Notes |
|------------|------|-------|
| `playType` | Single select | playground, arcade, open-space, ice-rink, pool, snow-sports, aerial, bowling, gardens |
| `setting` | Single select | indoor, outdoor, both |
| `hasFencedArea` | Checkbox | |
| `shadeCoverage` | Single select | none, partial, full |
| `hasWaterFountain` | Checkbox | |
| `hasPicnicTable` | Checkbox | |
| `playFeatures` | Multiple select | court, field, splash-pad, skate-park, disc-golf, ice-rink, pool, golf, bike-course, sledding, downhill-skiing, snowboarding, cross-country-skiing |

#### Hike
| Field Name | Type | Notes |
|------------|------|-------|
| `difficulty` | Single select | easy, moderate, hard |
| `distance` | Single line text | e.g., "2.5 miles" |
| `elevationGain` | Single line text | e.g., "500 ft" |
| `surface` | Single select | paved, gravel, dirt, mixed |
| `hasPicnicTable` | Checkbox | |
| `hasWaterFountain` | Checkbox | |
| `hikeType` | Single select | loop, out-and-back |
| `trailheadParking` | Long text | |
| `bestSeason` | Multiple select | spring, summer, fall, winter |
| `hikeFeatures` | Multiple select | view, waterfall, lake, pond, wildlife, rock-formations |
| `shadeCoverage` | Single select | none, partial, full |
| `duration` | Single line text | e.g., "1-2 hours" |

#### Eat
| Field Name | Type | Notes |
|------------|------|-------|
| `cuisine` | Single line text | e.g., "American", "Mexican" |
| `mealTypes` | Multiple select | breakfast, lunch, dinner, brunch, drinks, bakery, cafe, happy-hour |
| `eatFeatures` | Multiple select | kids-menu, high-chairs, outdoor-seating, coloring, play-area, quick-service, reservations, entertainment |
| `noiseLevel` | Single select | quiet, moderate, loud |

#### Learn
| Field Name | Type | Notes |
|------------|------|-------|
| `learnType` | Single select | museum, nature, attraction, historic-site, zoo, national-monument, national-park, observatory |
| `setting` | Single select | indoor, outdoor, both |
| `admissionRequired` | Checkbox | |
| `advanceBooking` | Checkbox | |
| `learnFeatures` | Multiple select | activities, exhibits, scenic, tours, demonstrations, gift-shop, cafe, restaurant, workshops, wildlife |

#### Shop
| Field Name | Type | Notes |
|------------|------|-------|
| `shopType` | Single select | toys, books, clothing, general, outdoor-market, boutique |
| `shopFeatures` | Multiple select | educational, activities, demonstrations, story-time, art, board-games, souvenirs, outdoor-gear |

## Step 3: Create Helpful Views

Create these views for easier management:

1. **All Published** - Filter: status = "Published"
2. **Play Listings** - Filter: category = "play"
3. **Hike Listings** - Filter: category = "hike"
4. **Eat Listings** - Filter: category = "eat"
5. **Learn Listings** - Filter: category = "learn"
6. **Shop Listings** - Filter: category = "shop"
7. **Top Picks** - Filter: isTopPick = true
8. **Drafts** - Filter: status = "Draft"
9. **Needs Images** - Filter: images is empty

## Step 4: Create Input Form

1. Click "Create" > "Form"
2. Add all fields you want to be editable
3. Set required fields
4. Share the form link with editors

## Step 5: Create API Token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Name it "Kid Friendly Flagstaff"
4. Add scopes:
   - `data.records:read`
   - `schema.bases:read`
5. Add your base to the token's access
6. Create and copy the token (starts with `pat_`)

## Step 6: Configure Environment Variables

### Local Development

Create `.env.local` in your project root:

```bash
AIRTABLE_API_KEY=pat_your_token_here
AIRTABLE_BASE_ID=appYourBaseIdHere
AIRTABLE_TABLE_NAME=Listings
```

**Finding your Base ID:**
Open your base in Airtable. The URL looks like:
`https://airtable.com/appXXXXXXXXXXXXXX/...`
The `appXXXXXXXXXXXXXX` part is your Base ID.

### Vercel Production

1. Go to your Vercel project dashboard
2. Settings > Environment Variables
3. Add the same three variables

## Step 7: Set Up Auto-Rebuild (Optional)

When you edit listings in Airtable, the site should automatically rebuild.

### Create Vercel Deploy Hook

1. Go to Vercel Dashboard > Your Project > Settings > Git > Deploy Hooks
2. Create a hook named "Airtable Update"
3. Copy the hook URL

### Create Airtable Automation

1. In Airtable, go to Automations
2. Create new automation
3. Trigger: "When a record is updated" (or created/deleted)
4. Action: "Send a webhook"
5. Paste your Vercel deploy hook URL
6. Test and enable

Now whenever a record changes, your site will automatically rebuild!

## Step 8: Import Existing Data

To migrate your existing JSON data to Airtable:

1. Export each JSON file to CSV format
2. In Airtable, click the dropdown arrow next to your table name
3. Select "Import data" > "CSV file"
4. Map the columns to your fields
5. Import

## Verification Checklist

- [ ] Airtable base created with all fields
- [ ] API token created with correct scopes
- [ ] Environment variables set locally
- [ ] Environment variables set in Vercel
- [ ] `npm run build` succeeds locally
- [ ] Test listing appears on site
- [ ] Auto-rebuild webhook triggers correctly

## Troubleshooting

### "Missing Airtable configuration" error
- Check that `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` are set
- Restart your dev server after adding env vars

### Records not appearing
- Check that records have `status` = "Published" (or empty)
- Verify field names match exactly (case-sensitive)

### Images not loading
- Images from Airtable attachments include temporary URLs
- For production, consider uploading to a CDN and using those URLs

### Build fails
- The app falls back to JSON files if Airtable isn't configured
- Check Vercel logs for specific errors

## Cost

| Tier | Records | Price |
|------|---------|-------|
| Free | 1,000 | $0/month |
| Team | 50,000 | ~$20/month |
| Business | 125,000 | ~$45/month |

For ~30 listings, the free tier is plenty.
