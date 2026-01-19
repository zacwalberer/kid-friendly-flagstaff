import type { AgeRange, Weather, Amenity, Difficulty, Surface, MealType, EatFeature } from './activity'

export interface BaseFilterState {
  ageRanges: AgeRange[]
  weather: Weather[]
  amenities: Amenity[]
  searchQuery: string
}

export interface HikeFilterState extends BaseFilterState {
  difficulty: Difficulty[]
  surface: Surface[]
  strollerFriendly: boolean | null
  isLoop: boolean | null
}

export interface EatFilterState extends BaseFilterState {
  mealTypes: MealType[]
  features: EatFeature[]
}

export interface PlayFilterState extends BaseFilterState {
  hasFencedArea: boolean | null
}

export interface ExploreFilterState extends BaseFilterState {
  admissionRequired: boolean | null
}

export interface ShopFilterState extends BaseFilterState {
  kidsFocused: boolean | null
}

export type FilterState =
  | BaseFilterState
  | HikeFilterState
  | EatFilterState
  | PlayFilterState
  | ExploreFilterState
  | ShopFilterState

export type FilterAction =
  | { type: 'SET_AGE_RANGES'; payload: AgeRange[] }
  | { type: 'TOGGLE_AGE_RANGE'; payload: AgeRange }
  | { type: 'SET_WEATHER'; payload: Weather[] }
  | { type: 'TOGGLE_WEATHER'; payload: Weather }
  | { type: 'SET_AMENITIES'; payload: Amenity[] }
  | { type: 'TOGGLE_AMENITY'; payload: Amenity }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_DIFFICULTY'; payload: Difficulty[] }
  | { type: 'TOGGLE_DIFFICULTY'; payload: Difficulty }
  | { type: 'SET_SURFACE'; payload: Surface[] }
  | { type: 'TOGGLE_SURFACE'; payload: Surface }
  | { type: 'SET_STROLLER_FRIENDLY'; payload: boolean | null }
  | { type: 'SET_IS_LOOP'; payload: boolean | null }
  | { type: 'SET_MEAL_TYPES'; payload: MealType[] }
  | { type: 'TOGGLE_MEAL_TYPE'; payload: MealType }
  | { type: 'SET_EAT_FEATURES'; payload: EatFeature[] }
  | { type: 'TOGGLE_EAT_FEATURE'; payload: EatFeature }
  | { type: 'SET_FENCED_AREA'; payload: boolean | null }
  | { type: 'SET_ADMISSION_REQUIRED'; payload: boolean | null }
  | { type: 'SET_KIDS_FOCUSED'; payload: boolean | null }
  | { type: 'RESET_FILTERS' }

export interface FilterConfig {
  label: string
  value: string
  icon?: string
}
