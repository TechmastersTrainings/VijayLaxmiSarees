import { useEffect } from 'react'
import { business } from '../data/business'

const setMeta = (attr, key, content) => {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const toAbsolute = (url) => {
  if (!url) return url
  return /^https?:\/\//.test(url) ? url : `${window.location.origin}${url}`
}

/**
 * Lightweight document-head manager so each route ships a correct title,
 * description, canonical URL, Open Graph tags and structured data
 * (JSON-LD) without a heavy library.
 */
export const useSeo = ({ title, description, path = '/', image, jsonLd }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${business.name}`
      : `${business.name} — ${business.tagline}`

    document.title = fullTitle
    setMeta('name', 'description', description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${window.location.origin}${path}`)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${window.location.origin}${path}`)
    if (image) setMeta('property', 'og:image', toAbsolute(image))
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
  }, [title, description, path, image])

  useEffect(() => {
    let el = document.getElementById('site-jsonld')
    if (!el) {
      el = document.createElement('script')
      el.id = 'site-jsonld'
      el.setAttribute('type', 'application/ld+json')
      document.head.appendChild(el)
    }
    el.textContent = jsonLd ? JSON.stringify(jsonLd) : ''
  }, [jsonLd])
}

export default useSeo