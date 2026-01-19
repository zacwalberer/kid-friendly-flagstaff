import { describe, it, expect } from 'vitest'
import {
  formatDistance,
  parseDistanceToMiles,
  formatElevation,
  formatDuration,
} from '@/utils/formatDistance'

describe('formatDistance', () => {
  it('returns string with units if already has miles', () => {
    expect(formatDistance('2 miles')).toBe('2 miles')
    expect(formatDistance('1.5 miles')).toBe('1.5 miles')
  })

  it('returns string with units if already has mi', () => {
    expect(formatDistance('2 mi')).toBe('2 mi')
  })

  it('adds miles suffix to number strings', () => {
    expect(formatDistance('2')).toBe('2 miles')
    expect(formatDistance('1.5')).toBe('1.5 miles')
  })

  it('uses singular mile for 1', () => {
    expect(formatDistance('1')).toBe('1 mile')
  })

  it('returns original string if cannot parse', () => {
    expect(formatDistance('various')).toBe('various')
  })
})

describe('parseDistanceToMiles', () => {
  it('parses distance with miles suffix', () => {
    expect(parseDistanceToMiles('2 miles')).toBe(2)
    expect(parseDistanceToMiles('1.5 miles')).toBe(1.5)
  })

  it('parses distance with mi suffix', () => {
    expect(parseDistanceToMiles('2 mi')).toBe(2)
  })

  it('parses plain numbers', () => {
    expect(parseDistanceToMiles('2')).toBe(2)
  })

  it('returns 0 for unparseable strings', () => {
    expect(parseDistanceToMiles('various')).toBe(0)
  })
})

describe('formatElevation', () => {
  it('returns string with units if already has ft', () => {
    expect(formatElevation('100 ft')).toBe('100 ft')
  })

  it('returns string with units if already has feet', () => {
    expect(formatElevation('100 feet')).toBe('100 feet')
  })

  it('adds ft suffix to number strings', () => {
    expect(formatElevation('100')).toBe('100 ft')
  })

  it('formats large numbers with commas', () => {
    expect(formatElevation('1000')).toBe('1,000 ft')
  })
})

describe('formatDuration', () => {
  it('returns string if already formatted', () => {
    expect(formatDuration('2 hours')).toBe('2 hours')
    expect(formatDuration('30 min')).toBe('30 min')
  })

  it('formats hours correctly', () => {
    expect(formatDuration('2')).toBe('2 hours')
  })

  it('uses singular hour for 1', () => {
    expect(formatDuration('1')).toBe('1 hour')
  })

  it('converts fractions to minutes', () => {
    expect(formatDuration('0.5')).toBe('30 min')
  })
})
