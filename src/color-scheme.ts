export type ColorScheme = 'light' | 'dark' | 'system'

export const COLOR_SCHEME_STORAGE_KEY = 'openspec-color-scheme'
export const DARK_THEME_CLASS = 'pf-v6-theme-dark'

export function readStoredColorScheme(): ColorScheme {
  try {
    const value = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)
    if (value === 'light' || value === 'dark' || value === 'system') {
      return value
    }
  } catch {
    /* private mode / SSR */
  }
  return 'system'
}

export function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches === true
}

export function isDarkScheme(scheme: ColorScheme): boolean {
  return scheme === 'dark' || (scheme === 'system' && systemPrefersDark())
}

export function applyColorScheme(scheme: ColorScheme) {
  if (typeof document === 'undefined') return
  const dark = isDarkScheme(scheme)
  document.documentElement.classList.toggle(DARK_THEME_CLASS, dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}
