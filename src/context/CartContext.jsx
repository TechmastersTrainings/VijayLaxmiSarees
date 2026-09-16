import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { getProductById } from '../data/products'

const CartContext = createContext(null)

const STORAGE_KEY = 'svs-cart-v1'

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const existing = state.find((l) => l.id === action.id)
      if (existing) {
        return state.map((l) =>
          l.id === action.id ? { ...l, qty: Math.min(l.qty + (action.qty || 1), 10) } : l
        )
      }
      return [...state, { id: action.id, qty: action.qty || 1 }]
    }
    case 'setQty':
      return state.map((l) =>
        l.id === action.id ? { ...l, qty: Math.max(1, Math.min(action.qty, 10)) } : l
      )
    case 'remove':
      return state.filter((l) => l.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, [], read)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — cart still works for the session */
    }
  }, [items])

  const value = useMemo(() => {
    const lines = items
      .map((l) => {
        const product = getProductById(l.id)
        if (!product) return null
        return { ...product, qty: l.qty, lineTotal: product.price * l.qty }
      })
      .filter(Boolean)

    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0)

    return {
      items,
      lines,
      count,
      subtotal,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      add: (id, qty = 1) => {
        dispatch({ type: 'add', id, qty })
        setDrawerOpen(true)
      },
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, drawerOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartContext
