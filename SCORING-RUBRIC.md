# Kid-Friendliness Scoring System

This document contains the scoring formulas and rubric for the automated kid-friendliness rating system.

## Overview

- **Raw Score (0-80):** Calculated by Airtable formula based on listing attributes
- **Star Rating (1-5):** Converted from raw score using thresholds
- **Normalized per category:** Each category's max possible = 80 points

## Score Distribution

| Raw Score | Stars |
|-----------|-------|
| 68-80     | 5     |
| 41-67     | 4     |
| 34-40     | 3     |
| 17-33     | 2     |
| 0-16      | 1     |

---

## Scoring Components

### Universal Components (All Categories) - Max 25 Points

| Factor | Points | Max | Logic |
|--------|--------|-----|-------|
| Amenities | varies | 15 | restrooms +5, changing-tables +4, parking +3, dog-friendly +3 |
| Accessibility | +5 each | 10 | wheelchair, stroller |

### Category-Specific Components - Max 55 Points Each

#### PLAY

| Factor | Points | Max |
|--------|--------|-----|
| Fenced Area | +8 | 8 |
| Shade Coverage | partial +5, full +4, none +0 | 5 |
| Water Fountain | +4 | 4 |
| Picnic Table | +4 | 4 |
| Setting | both +6, indoor +4, outdoor +3 | 6 |
| Features | +4 each (splash-pad, court, field, pool, bike-course, sledding, ice-rink) | 28 |

#### HIKE

| Factor | Points | Max |
|--------|--------|-----|
| Difficulty | easy +15, moderate +8, hard +0 | 15 |
| Surface | paved/gravel/mixed +6, dirt +4 | 6 |
| Shade Coverage | partial +5, full +4, none +0 | 5 |
| Water Fountain | +4 | 4 |
| Picnic Table | +4 | 4 |
| Features | waterfall +4, lake +4, pond +4, wildlife +3, view +3, rock-formations +3 | 21 |

#### EAT

| Factor | Points | Max |
|--------|--------|-----|
| Kids Menu | +10 | 10 |
| High Chairs | +8 | 8 |
| Play Area | +10 | 10 |
| Quick Service | +6 | 6 |
| Coloring | +6 | 6 |
| Outdoor Seating | +5 | 5 |
| Noise Level | quiet +5, moderate +3, loud +1 | 5 |
| Reservations | +5 | 5 |

#### LEARN

| Factor | Points | Max |
|--------|--------|-----|
| Setting | both +6, outdoor +4, indoor +3 | 6 |
| Activities | +10 | 10 |
| Workshops | +8 | 8 |
| Exhibits | +6 | 6 |
| Wildlife | +5 | 5 |
| Gift Shop | +5 | 5 |
| Cafe/Restaurant | +10 | 10 |
| Tours | +5 | 5 |

#### SHOP

| Factor | Points | Max |
|--------|--------|-----|
| Educational | +10 | 10 |
| Activities | +10 | 10 |
| Story Time | +10 | 10 |
| Demonstrations | +8 | 8 |
| Board Games | +6 | 6 |
| Art | +6 | 6 |
| Souvenirs | +5 | 5 |

---

## Airtable Formulas

### Formula 1: `kidFriendlinessRawScore`

Create a new **Formula** field with this formula:

```
(
  (
    IF(FIND("restrooms", ARRAYJOIN({amenities}, ",")), 5, 0) +
    IF(FIND("changing-tables", ARRAYJOIN({amenities}, ",")), 4, 0) +
    IF(FIND("parking", ARRAYJOIN({amenities}, ",")), 3, 0) +
    IF(FIND("dog-friendly", ARRAYJOIN({amenities}, ",")), 3, 0) +
    IF(FIND("wheelchair", ARRAYJOIN({accessibility}, ",")), 5, 0) +
    IF(FIND("stroller", ARRAYJOIN({accessibility}, ",")), 5, 0)
  ) +
  IF({category} = "play",
    IF({hasFencedArea}, 8, 0) +
    IF({shadeCoverage} = "partial", 5, IF({shadeCoverage} = "full", 4, 0)) +
    IF({hasWaterFountain}, 4, 0) +
    IF({hasPicnicTable}, 4, 0) +
    IF({setting} = "both", 6, IF({setting} = "indoor", 4, 3)) +
    IF(FIND("splash-pad", ARRAYJOIN({playFeatures}, ",")), 4, 0) +
    IF(FIND("court", ARRAYJOIN({playFeatures}, ",")), 4, 0) +
    IF(FIND("field", ARRAYJOIN({playFeatures}, ",")), 4, 0) +
    IF(FIND("pool", ARRAYJOIN({playFeatures}, ",")), 4, 0) +
    IF(FIND("bike-course", ARRAYJOIN({playFeatures}, ",")), 4, 0) +
    IF(FIND("sledding", ARRAYJOIN({playFeatures}, ",")), 4, 0) +
    IF(FIND("ice-rink", ARRAYJOIN({playFeatures}, ",")), 4, 0),
  IF({category} = "hike",
    IF({difficulty} = "easy", 15, IF({difficulty} = "moderate", 8, 0)) +
    IF({surface} = "dirt", 4, 6) +
    IF({shadeCoverage} = "partial", 5, IF({shadeCoverage} = "full", 4, 0)) +
    IF({hasWaterFountain}, 4, 0) +
    IF({hasPicnicTable}, 4, 0) +
    IF(FIND("waterfall", ARRAYJOIN({hikeFeatures}, ",")), 4, 0) +
    IF(FIND("lake", ARRAYJOIN({hikeFeatures}, ",")), 4, 0) +
    IF(FIND("pond", ARRAYJOIN({hikeFeatures}, ",")), 4, 0) +
    IF(FIND("wildlife", ARRAYJOIN({hikeFeatures}, ",")), 3, 0) +
    IF(FIND("view", ARRAYJOIN({hikeFeatures}, ",")), 3, 0) +
    IF(FIND("rock-formations", ARRAYJOIN({hikeFeatures}, ",")), 3, 0),
  IF({category} = "eat",
    IF(FIND("kids-menu", ARRAYJOIN({eatFeatures}, ",")), 10, 0) +
    IF(FIND("high-chairs", ARRAYJOIN({eatFeatures}, ",")), 8, 0) +
    IF(FIND("play-area", ARRAYJOIN({eatFeatures}, ",")), 10, 0) +
    IF(FIND("quick-service", ARRAYJOIN({eatFeatures}, ",")), 6, 0) +
    IF(FIND("coloring", ARRAYJOIN({eatFeatures}, ",")), 6, 0) +
    IF(FIND("outdoor-seating", ARRAYJOIN({eatFeatures}, ",")), 5, 0) +
    IF(FIND("reservations", ARRAYJOIN({eatFeatures}, ",")), 5, 0) +
    IF({noiseLevel} = "quiet", 5, IF({noiseLevel} = "moderate", 3, 1)),
  IF({category} = "learn",
    IF({setting} = "both", 6, IF({setting} = "outdoor", 4, 3)) +
    IF(FIND("activities", ARRAYJOIN({learnFeatures}, ",")), 10, 0) +
    IF(FIND("workshops", ARRAYJOIN({learnFeatures}, ",")), 8, 0) +
    IF(FIND("exhibits", ARRAYJOIN({learnFeatures}, ",")), 6, 0) +
    IF(FIND("wildlife", ARRAYJOIN({learnFeatures}, ",")), 5, 0) +
    IF(FIND("gift-shop", ARRAYJOIN({learnFeatures}, ",")), 5, 0) +
    IF(FIND("cafe", ARRAYJOIN({learnFeatures}, ",")), 10, 0) +
    IF(FIND("restaurant", ARRAYJOIN({learnFeatures}, ",")), 10, 0) +
    IF(FIND("tours", ARRAYJOIN({learnFeatures}, ",")), 5, 0),
  IF({category} = "shop",
    IF(FIND("educational", ARRAYJOIN({shopFeatures}, ",")), 10, 0) +
    IF(FIND("activities", ARRAYJOIN({shopFeatures}, ",")), 10, 0) +
    IF(FIND("story-time", ARRAYJOIN({shopFeatures}, ",")), 10, 0) +
    IF(FIND("demonstrations", ARRAYJOIN({shopFeatures}, ",")), 8, 0) +
    IF(FIND("board-games", ARRAYJOIN({shopFeatures}, ",")), 6, 0) +
    IF(FIND("art", ARRAYJOIN({shopFeatures}, ",")), 6, 0) +
    IF(FIND("souvenirs", ARRAYJOIN({shopFeatures}, ",")), 5, 0),
  0))))))
)
```

**Format:** Number (0 decimal places)

---

### Formula 2: `kidFriendlinessScore`

Create a new **Formula** field with this formula:

```
IF({kidFriendlinessRawScore} >= 68, 5,
IF({kidFriendlinessRawScore} >= 41, 4,
IF({kidFriendlinessRawScore} >= 34, 3,
IF({kidFriendlinessRawScore} >= 17, 2, 1))))
```

**Format:** Number (0 decimal places)

---

## Implementation Checklist

1. [ ] In Airtable: Delete or hide existing manual `kidFriendlinessScore` field (if it exists)
2. [ ] In Airtable: Create `kidFriendlinessRawScore` formula field (copy formula above)
3. [ ] In Airtable: Create `kidFriendlinessScore` formula field (copy formula above)
4. [ ] Test: Review scores for 2-3 listings in each category
5. [ ] Verify: Run `npm run build` locally
6. [ ] Verify: Run `npm run dev` and check star ratings display
7. [ ] Deploy: `vercel --prod`
