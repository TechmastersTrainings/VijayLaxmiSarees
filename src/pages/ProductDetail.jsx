import { useParams, Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { relatedProducts } from '../data/products'
import { useCatalog } from '../context/CatalogContext'
import { saveEnquiry } from '../lib/orders'
import { whatsappMessage } from '../data/business'
import { formatINR } from '../utils/format'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ProductGallery from '../components/products/ProductGallery'
import RelatedProducts from '../components/products/RelatedProducts'
import Button from '../components/common/Button'
import Notice from '../components/common/Notice'
import Icon from '../components/common/Icon'

export const ProductDetail = () => {
  const { id } = useParams()
  const catalog = useCatalog()
  const product = catalog.getProduct(id)
  const cart = useCart()
  const wishlist = useWishlist()

  const related = relatedProducts(product, 3)
    .map((p) => catalog.getProduct(p.id))
    .filter(Boolean)

  useSeo({
    title: product ? `${product.name} · Sri Vijaylaxmi Silks` : 'Saree not found',
    description: product?.description?.slice(0, 155),
    path: `/products/${id}`,
    jsonLd: product && {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: product.image,
      description: product.description,
      brand: { '@type': 'Brand', name: 'Sri Vijaylaxmi Silks' },
      ...(product.price && {
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: product.price,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Store', name: 'Sri Vijaylaxmi Silks, Bidar' },
        },
      }),
    },
  })

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <h1>Saree not found</h1>
            <p>We couldn't find that piece. It may have been moved from the catalogue.</p>
            <Link to="/products" className="btn">
              Browse the catalogue
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const priceLabel = formatINR(product.price)
  const wished = wishlist.has(product.id)

  return (
    <>
      <div className="container section--breadcrumb">
        <Breadcrumbs
          items={[
            { label: 'Products', to: '/products' },
            { label: product.name, to: `/products/${product.id}` },
          ]}
        />
      </div>

      <section className="section" style={{ paddingTop: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
        <div className="container">
          <div className="pd">
            <div className="pd__gallery">
              <ProductGallery product={product} />
            </div>

            <div className="pd__info">
              <div className="pd__chips">
                {product.category && <span className="badge badge--soft">{product.category}</span>}
                {product.weave && <span className="badge badge--gold">{product.weave}</span>}
                {product.fabric && <span className="badge badge--soft">{product.fabric}</span>}
              </div>

              <h1 className="pd__title">{product.name}</h1>

              <div className="pd__colour">
                {product.colour.map((c) => (
                  <span key={c} className="pd__colour-chip">
                    {c}
                  </span>
                ))}
              </div>

              <div className="pd__price">
                {priceLabel ? (
                  <>
                    <span className="pd__price-value">{priceLabel}</span>
                    <span className="pd__price-note">listed catalogue price</span>
                  </>
                ) : (
                  <span className="pd__price-value" style={{ fontSize: '1.5rem' }}>
                    Price on request
                  </span>
                )}
              </div>

              <p className="pd__desc">{product.description}</p>

              {product.inStock === false && (
                <Notice icon="info">
                  <strong>Currently out of stock.</strong> Message us on WhatsApp — we can often
                  arrange it or suggest a close alternative from the store.
                </Notice>
              )}

              <Notice icon="info">
                <strong>Catalogue price, not MRP.</strong> This is the price the store has listed
                publicly. Our team confirms the final price, availability and shipping from Bidar on
                WhatsApp before you buy. We never show inflated MRPs or fake discounts.
              </Notice>

              <div className="pd__actions">
                {priceLabel && product.inStock !== false ? (
                  <Button
                    onClick={() => cart.add(product.id)}
                    variant="primary"
                    style={{ flex: 1 }}
                  >
                    Add to Bag ({priceLabel})
                  </Button>
                ) : (
                  <Button
                    href={whatsappMessage(
                      `Hello Sri Vijaylaxmi Silks, I'm interested in "${product.name}". Please share the current price and availability.`
                    )}
                    onClick={() =>
                      saveEnquiry({
                        product_id: product.id,
                        message: `Interested in "${product.name}". Requesting current price and availability.`,
                        source: 'product-detail',
                      })
                    }
                    variant="whatsapp"
                    style={{ flex: 1 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={18} /> Enquire on WhatsApp
                  </Button>
                )}
                <Button
                  href={whatsappMessage(
                    `Hello Sri Vijaylaxmi Silks, I'm interested in "${product.name}" (${priceLabel || 'price on request'}). Please confirm price and availability.`
                  )}
                  variant="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} />
                </Button>
                <Button
                  onClick={() => wishlist.toggle(product.id)}
                  variant="outline"
                  aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-pressed={wished}
                >
                  <Icon name="heart" size={18} filled={wished} />
                  <span className="visually-hidden-on-desktop">{wished ? 'Saved' : 'Save'}</span>
                </Button>
              </div>

              <dl className="pd__details">
                {Object.entries(product.details || {}).map(([key, value]) => (
                  <div key={key} className="pd__detail-row">
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts products={related} />
    </>
  )
}

export default ProductDetail