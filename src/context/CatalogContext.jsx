import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { products as baseProducts, getProductById } from '../data/products'
import { supabase, supabaseConfigured } from '../lib/supabase'

const CatalogContext = createContext(null)

/**
 * Merges the static catalogue with admin-managed price/stock overrides from
 * Supabase so the storefront always reflects what the shop has published.
 * Without Supabase configured this simply returns the static catalogue.
 */
export const CatalogProvider = ({ children }) => {
  const [overrides, setOverrides] = useState({})
  const [loading, setLoading] = useState(supabaseConfigured)

  const load = useCallback(async () => {
    if (!supabaseConfigured) return
    setLoading(true)
    const { data, error } = await supabase.from('product_overrides').select('*')
    if (!error && data) {
      const map = {}
      for (const row of data) map[row.product_id] = row
      setOverrides(map)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const value = useMemo(() => {
    const merge = (product) => {
      if (!product) return product
      const o = overrides[product.id]
      if (!o) return { ...product, inStock: true }
      return {
        ...product,
        price: o.price ?? product.price,
        inStock: o.in_stock ?? true,
        stockNote: o.note ?? null,
      }
    }

    return {
      products: baseProducts.map(merge),
      getProduct: (id) => merge(getProductById(id)),
      overrides,
      loading,
      reload: load,
    }
  }, [overrides, loading, load])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export const useCatalog = () => {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}

export default CatalogContext
