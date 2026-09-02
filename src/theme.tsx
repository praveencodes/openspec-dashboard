import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  applyColorScheme,
  COLOR_SCHEME_STORAGE_KEY,
  isDarkScheme,
  readStoredColorScheme,
  type ColorScheme,
} from './color-scheme'

export type { ColorScheme } from './color-scheme'

type ThemeContextValue = {
  colorScheme: ColorScheme
  isDark: boolean
  setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() =>
    typeof window === 'undefined' ? 'system' : readStoredColorScheme(),
  )
  const [isDark, setIsDark] = useState(() =>
    typeof window === 'undefined' ? false : isDarkScheme(readStoredColorScheme()),
  )

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    try {
      localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme)
    } catch {
      /* ignore quota / private mode */
    }
    setColorSchemeState(scheme)
  }, [])

  useEffect(() => {
    const sync = () => {
      applyColorScheme(colorScheme)
      setIsDark(isDarkScheme(colorScheme))
    }
    sync()
    if (colorScheme !== 'system' || typeof window.matchMedia !== 'function') {
      return
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [colorScheme])

  const value = useMemo(
    () => ({ colorScheme, isDark, setColorScheme }),
    [colorScheme, isDark, setColorScheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
