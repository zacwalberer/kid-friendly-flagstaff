import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFavorites } from '@/hooks/useFavorites'

describe('useFavorites', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
    expect(result.current.favoriteCount).toBe(0)
  })

  it('adds a favorite', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('activity-1')
    })

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.favorites[0].id).toBe('activity-1')
    expect(result.current.favoriteCount).toBe(1)
  })

  it('does not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('activity-1')
      result.current.addFavorite('activity-1')
    })

    expect(result.current.favorites).toHaveLength(1)
  })

  it('removes a favorite', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('activity-1')
      result.current.addFavorite('activity-2')
    })

    expect(result.current.favoriteCount).toBe(2)

    act(() => {
      result.current.removeFavorite('activity-1')
    })

    expect(result.current.favoriteCount).toBe(1)
    expect(result.current.favorites[0].id).toBe('activity-2')
  })

  it('toggles a favorite', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite('activity-1')
    })

    expect(result.current.isFavorite('activity-1')).toBe(true)

    act(() => {
      result.current.toggleFavorite('activity-1')
    })

    expect(result.current.isFavorite('activity-1')).toBe(false)
  })

  it('checks if an activity is a favorite', () => {
    const { result } = renderHook(() => useFavorites())

    expect(result.current.isFavorite('activity-1')).toBe(false)

    act(() => {
      result.current.addFavorite('activity-1')
    })

    expect(result.current.isFavorite('activity-1')).toBe(true)
    expect(result.current.isFavorite('activity-2')).toBe(false)
  })

  it('clears all favorites', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('activity-1')
      result.current.addFavorite('activity-2')
      result.current.addFavorite('activity-3')
    })

    expect(result.current.favoriteCount).toBe(3)

    act(() => {
      result.current.clearFavorites()
    })

    expect(result.current.favoriteCount).toBe(0)
    expect(result.current.favorites).toEqual([])
  })
})
