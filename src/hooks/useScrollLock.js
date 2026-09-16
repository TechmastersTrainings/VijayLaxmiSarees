import { useEffect } from 'react'

/** Locks body scroll while a drawer / overlay is open. */
export const useScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}

export default useScrollLock
