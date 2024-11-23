/**
 * UTIL HOOKS
 * @returns
 */
export default function useUtil() {
  const getCookie = (cookieName: string): string | null => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${cookieName}=`)
    if (parts.length === 2) return parts.pop()?.split(';')?.shift() ?? null
    return null
  }
  return { getCookie }
}
