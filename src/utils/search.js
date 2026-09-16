import { products } from '../data/products'

/**
 * Simple client-side search across the real catalogue. Searches names,
 * categories, weaves, colours and occasions so results always match
 * something that actually exists.
 */
export const searchProducts = (query, limit = 6) => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products
    .map((p) => {
      const haystack = [
        p.name,
        p.category,
        p.weave,
        p.fabric,
        ...p.colour,
        ...p.occasion,
      ]
        .join(' ')
        .toLowerCase()
      const name = p.name.toLowerCase()
      let score = 0
      if (name.startsWith(q)) score += 5
      if (name.includes(q)) score += 3
      if (haystack.includes(q)) score += 1
      return { p, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.p)
}

export const filterProducts = (list, { colours = [], weaves = [], categories = [] }) =>
  list.filter((p) => {
    const colourOk = !colours.length || p.colour.some((c) => colours.includes(c))
    const weaveOk = !weaves.length || weaves.includes(p.weave)
    const catOk = !categories.length || categories.includes(p.category)
    return colourOk && weaveOk && catOk
  })
