import { Link } from 'react-router-dom'
import { formatINR, cx } from '../../utils/format'
import { whatsappMessage } from '../../data/business'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Icon from '../common/Icon'
import SmartImage from '../common/SmartImage'

export const ProductCard = ({ product, eager = false }) => {
  const cart = useCart()
  const wishlist = useWishlist()
  const wished = wishlist.has(product.id)
  const price = formatINR(product.price)

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <SmartImage src={product.image} alt={product.imageAlt} eager={eager} />
        </Link>

        <span className="product-card__tags">
          {product.weave && <span className="badge badge--soft">{product.weave}</span>}
          {product.inStock === false && <span className="badge badge--muted">Out of stock</span>}
        </span>

        <button
          type="button"
          className={cx('product-card__fav', wished && 'is-active')}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          onClick={() => wishlist.toggle(product.id)}
        >
          <Icon name="heart" size={18} />
        </button>

        <div className="product-card__quick">
          {product.price && product.inStock !== false ? (
            <button
              type="button"
              className="btn btn--sm btn--block"
              onClick={() => cart.add(product.id)}
            >
              Add to Bag
            </button>
          ) : (
            <a
              className="btn btn--sm btn--whatsapp btn--block"
              href={whatsappMessage(`Hello Sri Vijaylaxmi Silks, I would like to enquire about "${product.name}".`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire
            </a>
          )}
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__meta">{product.category}</p>
        <h3 className="product-card__name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-card__colour">{product.colour.join(' · ')}</p>
        <div className="product-card__foot">
          {price ? (
            <span className="product-card__price">
              {price}
              <small>Catalogue price</small>
            </span>
          ) : (
            <span className="product-card__price" style={{ fontSize: '1rem' }}>
              Price on request
            </span>
          )}
          <Link to={`/products/${product.id}`} className="product-card__action">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
