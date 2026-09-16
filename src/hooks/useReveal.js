import { useEffect, useRef, useState } from 'react'

/**
 * Adds the `is-visible` class to an element the first time it scrolls into
 * view. Used by the <Reveal> component for subtle fade-in sections.
 */
export const useReveal = (options = {}) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12, ...options }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return { ref, visible }
}

export default useReveal
