import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Button from '../components/common/Button'
import Notice from '../components/common/Notice'
import Icon from '../components/common/Icon'
import QuantityStepper from '../components/common/QuantityStepper'
import SmartImage from '../components/common/SmartImage'
import Reveal from '../components/common/Reveal'
import { whatsappMessage } from '../data/business'

export const CartPage = () => {
  useSeo({
    title: 'Your Shopping Bag',
    description: 'Review the sarees in your bag at Sri Vijaylaxmi Silks, Bidar before finalising your order on WhatsApp.',
    path: '/cart',
  })

  const { lines, subtotal, count, setQty, remove } = useCart()

  if (lines.length === 0) {
    return (
      <>
        <div className="container section--breadcrumb">
          <Breadcrumbs items={[{ label: 'Your Bag' }]} />
        </div>
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <Icon name="bag" size={34} />
              <h1>Your bag is empty</h1>
              <p>Add sarees you love, then review them here before confirming on WhatsApp.</p>
              <Link to="/products" className="btn">
                Browse Sarees
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <div className="container section--breadcrumb">
        <Breadcrumbs items={[{ label: 'Your Bag' }]} />
      </div>

      <section className="section" style={{ paddingTop: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
        <div className="container">
          <div className="cart-layout">
            <div className="cart-lines">
              <h1 className="cart-title">
                Your Bag ({count} {count === 1 ? 'item' : 'items'})
              </h1>

              {lines.map((line) => (
                <div key={line.id} className="cart-line cart-line--page">
                  <Link to={`/products/${line.id}`} className="cart-line__media">
                    <SmartImage src={line.image} alt={line.imageAlt} width="120" height="150" />
                  </Link>
                  <div className="cart-line__body">
                    <div>
                      <h3 className="cart-line__name">
                        <Link to={`/products/${line.id}`}>{line.name}</Link>
                      </h3>
                      <p className="cart-line__meta">
                        {line.category} · {line.colour.join(' · ')}
                      </p>
                      <p className="cart-line__price">{formatINR(line.price)} each</p>
                    </div>
                    <div className="cart-line__controls">
                      <QuantityStepper value={line.qty} onChange={(q) => setQty(line.id, q)} />
                      <button type="button" className="link-remove" onClick={() => remove(line.id)}>
                        Remove
                      </button>
                    </div>
                    <p className="cart-line__total">Total: {formatINR(line.lineTotal)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Reveal>
              <aside className="cart-summary">
                <h2>Order summary</h2>
                <div className="drawer__row">
                  <span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
                  <span className="drawer__total">{formatINR(subtotal)}</span>
                </div>
                <p className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
                  Shipping from Bidar, Karnataka is confirmed by the store on WhatsApp — never
                  charged silently.
                </p>

                <Notice icon="info">
                  <strong>Catalogue prices only.</strong> The store confirms the final price and
                  stock before any payment. No money is collected on this site.
                </Notice>

                <Button to="/checkout" variant="primary" style={{ width: '100%' }}>
                  Proceed to Checkout
                </Button>
                <Button to="/products" variant="outline" style={{ width: '100%' }}>
                  Continue Shopping
                </Button>
                <a
                  href={whatsappMessage(`Hello Sri Vijaylaxmi Silks, I have ${count} item(s) worth ${formatINR(subtotal)} in my bag. Please confirm price and availability.`)}
                  className="btn btn--whatsapp btn--block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} /> Ask about my bag on WhatsApp
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

export default CartPage