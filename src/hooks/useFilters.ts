'use client'

import { useReducer, useCallback, useMemo } from 'react'
import type {
  BaseFilterState,
  HikeFilterState,
  EatFilterState,
  PlayFilterState,
  ExploreFilterState,
  ShopFilterState,
  FilterAction,
} from '@/types/filters'
import type { Category } from '@/types/activity'

// Initial states for each category
export const initialBaseFilterState: BaseFilterState = {
  ageRanges: [],
  weather: [],
  amenities: [],
  accessibility: [],
  searchQuery: '',
}

export const initialHikeFilterState: HikeFilterState = {
  ...initialBaseFilterState,
  difficulty: [],
  surface: [],
  isLoop: null,
  shadeCoverage: null,
}

export const initialEatFilterState: EatFilterState = {
  ...initialBaseFilterState,
  mealTypes: [],
  features: [],
}

export const initialPlayFilterState: PlayFilterState = {
  ...initialBaseFilterState,
  hasFencedArea: null,
  setting: null,
}

export const initialExploreFilterState: ExploreFilterState = {
  ...initialBaseFilterState,
  admissionRequired: null,
  setting: null,
}

export const initialShopFilterState: ShopFilterState = {
  ...initialBaseFilterState,
  kidsFocused: null,
}

function getInitialState(category: Category) {
  switch (category) {
    case 'hike':
      return initialHikeFilterState
    case 'eat':
      return initialEatFilterState
    case 'play':
      return initialPlayFilterState
    case 'explore':
      return initialExploreFilterState
    case 'shop':
      return initialShopFilterState
    default:
      return initialBaseFilterState
  }
}

function filterReducer(
  state: BaseFilterState | HikeFilterState | EatFilterState | PlayFilterState | ExploreFilterState | ShopFilterState,
  action: FilterAction
) {
  switch (action.type) {
    case 'SET_AGE_RANGES':
      return { ...state, ageRanges: action.payload }
    case 'TOGGLE_AGE_RANGE': {
      const ageRanges = state.ageRanges.includes(action.payload)
        ? state.ageRanges.filter((a) => a !== action.payload)
        : [...state.ageRanges, action.payload]
      return { ...state, ageRanges }
    }
    case 'SET_WEATHER':
      return { ...state, weather: action.payload }
    case 'TOGGLE_WEATHER': {
      const weather = state.weather.includes(action.payload)
        ? state.weather.filter((w) => w !== action.payload)
        : [...state.weather, action.payload]
      return { ...state, weather }
    }
    case 'SET_AMENITIES':
      return { ...state, amenities: action.payload }
    case 'TOGGLE_AMENITY': {
      const amenities = state.amenities.includes(action.payload)
        ? state.amenities.filter((a) => a !== action.payload)
        : [...state.amenities, action.payload]
      return { ...state, amenities }
    }
    case 'SET_ACCESSIBILITY':
      return { ...state, accessibility: action.payload }
    case 'TOGGLE_ACCESSIBILITY': {
      const accessibility = state.accessibility.includes(action.payload)
        ? state.accessibility.filter((a) => a !== action.payload)
        : [...state.accessibility, action.payload]
      return { ...state, accessibility }
    }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload }
    case 'TOGGLE_DIFFICULTY': {
      const hikeState = state as HikeFilterState
      const difficulty = hikeState.difficulty.includes(action.payload)
        ? hikeState.difficulty.filter((d) => d !== action.payload)
        : [...hikeState.difficulty, action.payload]
      return { ...state, difficulty }
    }
    case 'SET_SURFACE':
      return { ...state, surface: action.payload }
    case 'TOGGLE_SURFACE': {
      const hikeState = state as HikeFilterState
      const surface = hikeState.surface.includes(action.payload)
        ? hikeState.surface.filter((s) => s !== action.payload)
        : [...hikeState.surface, action.payload]
      return { ...state, surface }
    }
    case 'SET_IS_LOOP':
      return { ...state, isLoop: action.payload }
    case 'SET_SHADE_COVERAGE':
      return { ...state, shadeCoverage: action.payload }
    case 'SET_MEAL_TYPES':
      return { ...state, mealTypes: action.payload }
    case 'TOGGLE_MEAL_TYPE': {
      const eatState = state as EatFilterState
      const mealTypes = eatState.mealTypes.includes(action.payload)
        ? eatState.mealTypes.filter((m) => m !== action.payload)
        : [...eatState.mealTypes, action.payload]
      return { ...state, mealTypes }
    }
    case 'SET_EAT_FEATURES':
      return { ...state, features: action.payload }
    case 'TOGGLE_EAT_FEATURE': {
      const eatState = state as EatFilterState
      const features = eatState.features.includes(action.payload)
        ? eatState.features.filter((f) => f !== action.payload)
        : [...eatState.features, action.payload]
      return { ...state, features }
    }
    case 'SET_FENCED_AREA':
      return { ...state, hasFencedArea: action.payload }
    case 'SET_SETTING':
      return { ...state, setting: action.payload }
    case 'SET_ADMISSION_REQUIRED':
      return { ...state, admissionRequired: action.payload }
    case 'SET_KIDS_FOCUSED':
      return { ...state, kidsFocused: action.payload }
    case 'RESET_FILTERS':
      // Return the initial state based on current category type
      if ('difficulty' in state) return initialHikeFilterState
      if ('mealTypes' in state) return initialEatFilterState
      if ('hasFencedArea' in state) return initialPlayFilterState
      if ('admissionRequired' in state) return initialExploreFilterState
      if ('kidsFocused' in state) return initialShopFilterState
      return initialBaseFilterState
    default:
      return state
  }
}

export function useFilters(category: Category) {
  const [filters, dispatch] = useReducer(filterReducer, getInitialState(category))

  const setFilters = useCallback(
    (newFilters: typeof filters) => {
      // Update each filter type individually
      dispatch({ type: 'SET_AGE_RANGES', payload: newFilters.ageRanges })
      dispatch({ type: 'SET_WEATHER', payload: newFilters.weather })
      dispatch({ type: 'SET_AMENITIES', payload: newFilters.amenities })
      dispatch({ type: 'SET_SEARCH_QUERY', payload: newFilters.searchQuery })
    },
    []
  )

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' })
  }, [])

  const hasActiveFilters = useMemo(() => {
    if (filters.ageRanges.length > 0) return true
    if (filters.weather.length > 0) return true
    if (filters.amenities.length > 0) return true
    if (filters.accessibility.length > 0) return true
    if (filters.searchQuery) return true

    // Check category-specific filters
    const hikeFilters = filters as HikeFilterState
    const eatFilters = filters as EatFilterState
    const playFilters = filters as PlayFilterState
    const exploreFilters = filters as ExploreFilterState
    const shopFilters = filters as ShopFilterState

    if ('difficulty' in filters && hikeFilters.difficulty?.length > 0) return true
    if ('surface' in filters && hikeFilters.surface?.length > 0) return true
    if ('isLoop' in filters && hikeFilters.isLoop !== null) return true
    if ('shadeCoverage' in filters && hikeFilters.shadeCoverage !== null) return true
    if ('mealTypes' in filters && eatFilters.mealTypes?.length > 0) return true
    if ('features' in filters && eatFilters.features?.length > 0) return true
    if ('hasFencedArea' in filters && playFilters.hasFencedArea !== null) return true
    if ('setting' in filters && (playFilters.setting !== null || exploreFilters.setting !== null)) return true
    if ('admissionRequired' in filters && exploreFilters.admissionRequired !== null) return true
    if ('kidsFocused' in filters && shopFilters.kidsFocused !== null) return true

    return false
  }, [filters])

  return {
    filters,
    dispatch,
    setFilters,
    resetFilters,
    hasActiveFilters,
  }
}
