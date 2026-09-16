import { useSeo } from '../hooks/useSeo'
import { getCollection } from '../data/collections'
import { getProductsByCollection } from '../data/products'
import { whatsappMessage } from '../data/business'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ProductGrid from '../components/products/ProductGrid'
import Reveal from '../components/common/Reveal'
import Icon from '../components/common/Icon'
import { Link } from 'react-router-dom'

/**
 * Shared template for the four collection pages. `story` lets each page show
 * its own editorial split (wedding quote, silk edit, designer edit…).
 */
export const CollectionPage = ({ slug, story }) => {
  const collection = getCollection(slug)
  const items = getProductsByCollection(slug)

  useSeo({
    title: collection.title,
    description: collection.description,
    path: collection.path,
  })

  if (!collection) return null

  return (
    <>
      <header className="page-hero page-hero--collection">
        <div className="container">
          <Breadcrumbs items={[{ label: collection.title }]} />
          <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
            {collection.kicker}
          </span>
          <h1>{collection.title}</h1>
          <p className="lede" style={{ maxWidth: '62ch' }}>
            {collection.description}
          </p>
        </div>
      </header>

      {story}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">In this collection</span>
              <h2 style={{ margin: '0.4rem 0 0.2rem' }}>
                {items.length} {items.length === 1 ? 'saree' : 'sarees'} featured
              </h2>
              <p className="muted" style={{ maxWidth: '56ch' }}>
                Pieces published by Sri Vijaylaxmi Silks for the {collection.title.toLowerCase()}.
              </p>
            </div>
            <Link to="/products" className="btn btn--outline">
              View full catalogue
            </Link>
          </div>

          {items.length ? (
            <Reveal>
              <ProductGrid products={items} columns={3} eagerCount={items.length} />
            </Reveal>
          ) : (
            <div className="section__notice">
              <Icon name="info" size={20} />
              <p>
                We're currently featuring the fresh stock live on Instagram and WhatsApp. Message
                us to see what's new in the {collection.title.toLowerCase()} this week.
              </p>
              <a
                href={whatsappMessage(
                  `Hello Sri Vijaylaxmi Silks, please share what's new in the ${collection.title.toLowerCase()} this week.`
                )}
                className="btn btn--whatsapp btn--sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={16} /> Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default CollectionPage