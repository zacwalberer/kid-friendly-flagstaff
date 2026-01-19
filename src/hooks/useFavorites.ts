'use client'

import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export interface FavoriteItem {
  id: string
  addedAt: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('kff-favorites', [])

  const addFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        // Don't add if already exists
        if (prev.some((fav) => fav.id === id)) {
          return prev
        }
        return [...prev, { id, addedAt: new Date().toISOString() }]
      })
    },
    [setFavorites]
  )

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id))
    },
    [setFavorites]
  )

  const toggleFavorite = useCallback(
    (id: string) => {
      const isFavorited = favorites.some((fav) => fav.id === id)
      if (isFavorited) {
        removeFavorite(id)
      } else {
        addFavorite(id)
      }
    },
    [favorites, addFavorite, removeFavorite]
  )

  const isFavorite = useCallback(
    (id: string): boolean => {
      return favorites.some((fav) => fav.id === id)
    },
    [favorites]
  )

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [setFavorites])

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoriteCount: favorites.length,
  }
}
