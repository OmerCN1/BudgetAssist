export const LANGUAGE_STORAGE_KEY = "budgetassist_landing_language"

export const LANGUAGE_OPTIONS = [
  { code: "tr", label: "TR", name: "Türkçe" },
  { code: "en", label: "EN", name: "English" },
]

export function getStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return LANGUAGE_OPTIONS.some((option) => option.code === stored) ? stored : "tr"
  } catch {
    return "tr"
  }
}

export function setStoredLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch { /* ignore */ }
}
