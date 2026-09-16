import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { products, getAllColours, getAllWeaves, getAllCategories } from '../data/products'
import { filterProducts } from '../utils/search'
import { useWishlist } from '../context/WishlistContext'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'
import Button from '../components/common/Button'
import Reveal from '../components/common/Reveal'

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
]

export const Products = () => {
  useSeo({
    title: 'All Sarees',
    description:
      'Browse the saree catalogue of Sri Vijaylaxmi Silks, Bidar — Kanchipuram, Banarasi, Venkatgiri tissue and designer sarees with transparent catalogue pricing.',
    path: '/products',
  })

  const [searchParams] = useSearchParams()
  const wishlist = useWishlist()
  const wishlistView = searchParams.get('view') === 'wishlist'

  const [selected, setSelected] = useState({ colours: [], weaves: [], categories: [] })
  const [sort, setSort] = useState('featured')

  const facets = useMemo(
    () => ({ colours: getAllColours(), weaves: getAllWeaves(), categories: getAllCategories() }),
    []
  )

  const base = wishlistView ? products.filter((p) => wishlist.ids.includes(p.id)) : products

  const visible = useMemo(() => {
    let list = filterProducts(base, selected)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, selected, sort, wishlist.ids])

  const toggle = (group, value) =>
    setSelected((prev) => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter((v) => v !== value)
        : [...prev[group], value],
    }))

  const hasActive = selected.colours.length || selected.weaves.length || selected.categories.length
  const clear = () => setSelected({ colours: [], weaves: [], categories: [] })

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Products' }]} />
          <h1>{wishlistView ? 'Your Wishlist' : 'All Sarees'}</h1>
          <p className="lede" style={{ maxWidth: '62ch' }}>
            {wishlistView
              ? 'The sarees you have saved. Share them with us on WhatsApp to check availability.'
              : 'The full real catalogue of Sri Vijaylaxmi Silks. Prices shown are catalogue prices — our team confirms the final price and availability on WhatsApp.'}
          </p>
        </div>
      </header>

      <div className="catalog-toolbar">
        <div className="container catalog-toolbar__row">
          <span className="catalog-count">
            {visible.length} {visible.length === 1 ? 'saree' : 'sarees'}
          </span>
          <div className="select-wrap">
            <label htmlFor="sort" className="visually-hidden">
              Sort products
            </label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="products-layout">
            <ProductFilters
              facets={facets}
              selected={selected}
              onToggle={toggle}
              onClear={clear}
              hasActive={hasActive}
            />

            <div>
              {visible.length === 0 ? (
                <div className="empty-state">
                  <h3>No sarees match these filters</h3>
                  <p>
                    {wishlistView
                      ? 'Your wishlist is empty. Add sarees you love while browsing.'
                      : 'Try removing a filter or explore the full catalogue.'}
                  </p>
                  <Button onClick={clear}>Reset filters</Button>
                </div>
              ) : (
                <Reveal>
                  <ProductGrid products={visible} columns={3} eagerCount={3} />
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Products