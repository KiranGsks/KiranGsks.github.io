/**
 * useAIMenu — React hook for fetching AI-generated menu options.
 * Handles loading state, errors, retries, and exposes the parsed MenuResponse.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchMenuOptions } from '../api/menuService'
import type { MenuResponse, StepContext } from '../types/aiMenu'

export type UseAIMenuState = {
  loading: boolean
  error: string | null
  menu: MenuResponse | null
  retry: () => void
}

/**
 * Fetches menu options for the given step context.
 * Automatically triggers on context change.
 * Returns loading/error/data states plus a retry function.
 */
export function useAIMenu(ctx: StepContext | null): UseAIMenuState {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [menu, setMenu] = useState<MenuResponse | null>(null)
  const abortRef = useRef(false)
  const ctxRef = useRef<string | null>(null)

  const fetchData = useCallback(async (context: StepContext) => {
    setLoading(true)
    setError(null)
    setMenu(null)
    abortRef.current = false

    try {
      const result = await fetchMenuOptions(context)
      if (!abortRef.current) {
        setMenu(result)
        setError(null)
      }
    } catch (err) {
      if (!abortRef.current) {
        const message = err instanceof Error ? err.message : 'Failed to fetch menu options'
        setError(message)
        setMenu(null)
      }
    } finally {
      if (!abortRef.current) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    if (!ctx) {
      setMenu(null)
      setError(null)
      setLoading(false)
      return
    }

    // Deduplicate: don't refetch if context hasn't changed
    const ctxKey = JSON.stringify(ctx)
    if (ctxKey === ctxRef.current) return
    ctxRef.current = ctxKey

    fetchData(ctx)

    return () => {
      abortRef.current = true
    }
  }, [ctx, fetchData])

  const retry = useCallback(() => {
    if (ctx) {
      ctxRef.current = null // force refetch
      fetchData(ctx)
    }
  }, [ctx, fetchData])

  return { loading, error, menu, retry }
}
