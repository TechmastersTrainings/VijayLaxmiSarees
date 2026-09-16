import { Link } from 'react-router-dom'
import { cx } from '../../utils/format'
import { formatINR } from '../../utils/format'
import { useCart } from '../../context/CartContext'
import { useScrollLock } from '../../hooks/useScrollLock'
import Icon from '../common/Icon'
import QuantityStepper from '../common/QuantityStepper'
import SmartImage from '../common/SmartImage'

export const CartDrawer = () => {
  const { lines, subtotal, count, drawerOpen, closeDrawer, setQty, remove } = useCart()
  useScrollLock(drawerOpen)

  return (
    <>
      <div
        className={cx('drawer-scrim', drawerOpen && 'is-open')}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={cx('drawer', drawerOpen && 'is-open')}
        aria-label="Shopping bag"
        aria-hidden={!drawerOpen}
      >
        <div className="drawer__head">
          <h2 className="drawer__title">Your Bag {count > 0 && `(${count})`}</h2>
          <button type="button" className="icon-btn" aria-label="Close bag" onClick={closeDrawer}>
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer__body">
          {lines.length === 0 ? (
            <div className="empty-state" style={{ border: 0, background: 'transparent' }}>
              <h3>Your bag is empty</h3>
              <p>Explore our real silk, designer and wedding sarees to get started.</p>
              <Link to="/products" className="btn" onClick={closeDrawer}>
                Browse Sarees
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <div key={line.id} className="cart-line">
                <Link to={`/products/${line.id}`} className="cart-line__media" onClick={closeDrawer}>
                  <SmartImage src={line.image} alt={line.imageAlt} width="104" height="130" />
                </Link>
                <div>
                  <h3 className="cart-line__name">
                    <Link to={`/products/${line.id}`} onClick={closeDrawer}>
                      {line.name}
                    </Link>
                  </h3>
                  <p className="cart-line__meta">{line.category}</p>
                  <p className="cart-line__price">{formatINR(line.lineTotal)}</p>
                </div>
                <div className="cart-line__controls">
                  <QuantityStepper value={line.qty} onChange={(q) => setQty(line.id, q)} />
                  <button type="button" className="link-remove" onClick={() => remove(line.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__row">
              <span>Subtotal</span>
              <span className="drawer__total">{formatINR(subtotal)}</span>
            </div>
            <p className="drawer__note">
              Prices shown are as published in the store catalogue. Our team confirms the final
              price and availability on WhatsApp before any purchase.
            </p>
            <Link to="/checkout" className="btn btn--block" onClick={closeDrawer}>
              Proceed to Checkout
            </Link>
            <Link to="/cart" className="btn btn--outline btn--block" onClick={closeDrawer}>
              View Full Bag
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
