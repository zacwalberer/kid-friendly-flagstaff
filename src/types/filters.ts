import type {
  AgeRange,
  Weather,
  Amenity,
  Difficulty,
  Surface,
  MealType,
  EatFeature,
  Accessibility,
  Setting,
  ShadeCoverage,
  HikeType,
  PlayFeature,
  LearnFeature,
  ShopFeature,
} from './listing'

export interface BaseFilterState {
  ageRanges: AgeRange[]
  weather: Weather[]
  amenities: Amenity[]
  accessibility: Accessibility[]
  searchQuery: string
}

export interface HikeFilterState extends BaseFilterState {
  difficulty: Difficulty[]
  surface: Surface[]
  hikeType: HikeType | null
  shadeCoverage: ShadeCoverage | null
}

export interface EatFilterState extends BaseFilterState {
  mealTypes: MealType[]
  features: EatFeature[]
}

export interface PlayFilterState extends BaseFilterState {
  hasFencedArea: boolean | null
  setting: Setting | null
  shadeCoverage: ShadeCoverage | null
  features: PlayFeature[]
}

export interface LearnFilterState extends BaseFilterState {
  admissionRequired: boolean | null
  setting: Setting | null
  features: LearnFeature[]
}

export interface ShopFilterState extends BaseFilterState {
  features: ShopFeature[]
}

export type FilterState =
  | BaseFilterState
  | HikeFilterState
  | EatFilterState
  | PlayFilterState
  | LearnFilterState
  | ShopFilterState

export type FilterAction =
  | { type: 'SET_AGE_RANGES'; payload: AgeRange[] }
  | { type: 'TOGGLE_AGE_RANGE'; payload: AgeRange }
  | { type: 'SET_WEATHER'; payload: Weather[] }
  | { type: 'TOGGLE_WEATHER'; payload: Weather }
  | { type: 'SET_AMENITIES'; payload: Amenity[] }
  | { type: 'TOGGLE_AMENITY'; payload: Amenity }
  | { type: 'SET_ACCESSIBILITY'; payload: Accessibility[] }
  | { type: 'TOGGLE_ACCESSIBILITY'; payload: Accessibility }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_DIFFICULTY'; payload: Difficulty[] }
  | { type: 'TOGGLE_DIFFICULTY'; payload: Difficulty }
  | { type: 'SET_SURFACE'; payload: Surface[] }
  | { type: 'TOGGLE_SURFACE'; payload: Surface }
  | { type: 'SET_HIKE_TYPE'; payload: HikeType | null }
  | { type: 'SET_SHADE_COVERAGE'; payload: ShadeCoverage | null }
  | { type: 'SET_MEAL_TYPES'; payload: MealType[] }
  | { type: 'TOGGLE_MEAL_TYPE'; payload: MealType }
  | { type: 'SET_EAT_FEATURES'; payload: EatFeature[] }
  | { type: 'TOGGLE_EAT_FEATURE'; payload: EatFeature }
  | { type: 'SET_FENCED_AREA'; payload: boolean | null }
  | { type: 'SET_SETTING'; payload: Setting | null }
  | { type: 'SET_ADMISSION_REQUIRED'; payload: boolean | null }
  | { type: 'SET_PLAY_FEATURES'; payload: PlayFeature[] }
  | { type: 'TOGGLE_PLAY_FEATURE'; payload: PlayFeature }
  | { type: 'SET_LEARN_FEATURES'; payload: LearnFeature[] }
  | { type: 'TOGGLE_LEARN_FEATURE'; payload: LearnFeature }
  | { type: 'SET_SHOP_FEATURES'; payload: ShopFeature[] }
  | { type: 'TOGGLE_SHOP_FEATURE'; payload: ShopFeature }
  | { type: 'RESET_FILTERS' }

export interface FilterConfig {
  label: string
  value: string
  icon?: string
}
