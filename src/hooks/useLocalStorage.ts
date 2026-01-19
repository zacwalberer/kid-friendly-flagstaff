'use client'

import { useState, useCallback } from 'react'

// Read from localStorage (client-side only)
function readFromStorage<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue
  }
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Use lazy initializer to read from localStorage on first render
  const [storedValue, setStoredValue] = useState<T>(() =>
    readFromStorage(key, initialValue)
  )

  // Save to localStorage whenever value changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        try {
          // Allow value to be a function so we have same API as useState
          const valueToStore = value instanceof Function ? value(prev) : value
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          return valueToStore
        } catch {
          // Failed to save to localStorage, return previous value
          return prev
        }
      })
    },
    [key]
  )

  return [storedValue, setValue]
}
