import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchProducts } from '../../utils/search'
import { useScrollLock } from '../../hooks/useScrollLock'
import { formatINR } from '../../utils/format'
import Icon from '../common/Icon'

export const SearchOverlay = ({ open, onClose }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  useScrollLock(open)

  const results = useMemo(() => searchProducts(query), [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      const id = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const go = (id) => {
    onClose()
    navigate(`/products/${id}`)
  }

  return (
    <div className="search-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search products">
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-panel__head">
          <Icon name="search" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, weaves, colours…"
            aria-label="Search sarees"
          />
          <button type="button" className="icon-btn" aria-label="Close search" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        {query.trim() === '' ? (
          <div className="search-empty">
            Try “Kanchipuram”, “Banarasi”, “red”, “bridal” or “designer”.
          </div>
        ) : results.length === 0 ? (
          <div className="search-empty">
            No sarees match “{query}”. Browse the full catalogue or ask us on WhatsApp.
          </div>
        ) : (
          <div className="search-results">
            {results.map((p) => (
              <button key={p.id} type="button" className="search-result" onClick={() => go(p.id)}>
                <img src={p.image} alt={p.imageAlt} width="52" height="64" loading="lazy" />
                <span>
                  <span className="search-result__name">{p.name}</span>
                  <span className="search-result__meta">
                    {p.category} · {formatINR(p.price) || 'Price on request'}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchOverlay
