import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import { business, whatsappMessage } from '../data/business'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Button from '../components/common/Button'
import Notice from '../components/common/Notice'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'

/**
 * Honest checkout. There is no backend and no online payment — the final
 * price, stock and shipping are confirmed and completed with the store on
 * WhatsApp. This page simply composes a well-formed order message.
 */
export const Checkout = () => {
  useSeo({
    title: 'Checkout',
    description:
      'Finalise your order from Sri Vijaylaxmi Silks, Bidar. Catalogue prices are confirmed by the store on WhatsApp before any payment.',
    path: '/checkout',
  })

  const { lines, subtotal, count } = useCart()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pin: '',
    notes: '',
  })
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const summary = lines
    .map((l) => `• ${l.name} — qty ${l.qty} (${formatINR(l.lineTotal)})`)
    .join('\n')

  const sendMessage = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || lines.length === 0) {
      setError('Please add your name and phone number so the store can reach you.')
      return
    }
    setError('')
    const message = [
      `Hello ${business.name}, I would like to place an order.`,
      '',
      'ORDER',
      summary,
      `Subtotal: ${formatINR(subtotal)} (${count} items)`,
      '',
      'DETAILS',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      ...(form.address.trim() ? [`Delivery to: ${form.address.trim()}`] : []),
      ...(form.city.trim() ? [`City: ${form.city.trim()}`] : []),
      ...(form.pin.trim() ? [`PIN: ${form.pin.trim()}`] : []),
      ...(form.notes.trim() ? [`Note: ${form.notes.trim()}`] : []),
      '',
      'Please confirm the final price, stock and delivery from Bidar. Thank you!',
    ].join('\n')
    window.open(whatsappMessage(message), '_blank', 'noopener,noreferrer')
  }

  if (lines.length === 0) {
    return (
      <>
        <div className="container section--breadcrumb">
          <Breadcrumbs items={[{ label: 'Checkout' }]} />
        </div>
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <Icon name="bag" size={34} />
              <h1>Nothing to checkout</h1>
              <p>Add sarees to your bag first — then the store confirms everything on WhatsApp.</p>
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
        <Breadcrumbs items={[{ label: 'Checkout' }]} />
      </div>

      <section className="section" style={{ paddingTop: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
        <div className="container">
          <div className="checkout-layout">
            <Reveal>
              <form className="checkout-form" onSubmit={sendMessage} noValidate>
                <Notice icon="shield">
                  <strong>No payment on this site.</strong> Your order is prepared on WhatsApp.
                  The store confirms the final price, stock and shipping before you pay — how and
                  where you prefer.
                </Notice>

                <h1 className="checkout-title" style={{ margin: '1.4rem 0 0.2rem' }}>
                  Your details
                </h1>
                <p className="muted" style={{ marginTop: 0, marginBottom: '1.4rem' }}>
                  So the store can reach you about your order.
                </p>

                <div className="field">
                  <label htmlFor="name">Full name (required)</label>
                  <input id="name" type="text" autoComplete="name" value={form.name} onChange={update('name')} required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone / WhatsApp (required)</label>
                  <input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} required />
                </div>
                <div className="field">
                  <label htmlFor="address">Delivery address</label>
                  <textarea id="address" rows={3} autoComplete="street-address" value={form.address} onChange={update('address')} />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" autoComplete="address-level2" value={form.city} onChange={update('city')} />
                  </div>
                  <div className="field">
                    <label htmlFor="pin">PIN code</label>
                    <input id="pin" type="text" inputMode="numeric" autoComplete="postal-code" value={form.pin} onChange={update('pin')} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="notes">Anything for the store?</label>
                  <textarea id="notes" rows={2} value={form.notes} onChange={update('notes')} placeholder="Colour preferences, occasion, delivery date…" />
                </div>

                {error && (
                  <p role="alert" className="field-error">
                    {error}
                  </p>
                )}

                <Button type="submit" variant="whatsapp" style={{ width: '100%' }}>
                  <Icon name="whatsapp" size={18} /> Send order on WhatsApp
                </Button>
              </form>
            </Reveal>

            <Reveal delay={100}>
              <aside className="cart-summary">
                <h2>Order summary</h2>
                <ul className="checkout-lines">
                  {lines.map((l) => (
                    <li key={l.id}>
                      <div>
                        <Link to={`/products/${l.id}`} className="cart-line__name">
                          {l.name}
                        </Link>
                        <span className="cart-line__meta">Qty {l.qty}</span>
                      </div>
                      <span>{formatINR(l.lineTotal)}</span>
                    </li>
                  ))}
                </ul>
                <div className="drawer__row">
                  <span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
                  <span className="drawer__total">{formatINR(subtotal)}</span>
                </div>
                <p className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
                  Shipping & final price: confirmed by the store on WhatsApp from Bidar, Karnataka.
                </p>
                <Link to="/cart" className="btn btn--outline" style={{ width: '100%' }}>
                  Back to bag
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout