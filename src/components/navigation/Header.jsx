import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cx } from '../../utils/format'
import { business, whatsappMessage } from '../../data/business'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Icon from '../common/Icon'
import Brand from './Brand'
import navItems from './navItems'
import MobileMenu from './MobileMenu'
import SearchOverlay from '../search/SearchOverlay'
import CartDrawer from '../cart/CartDrawer'

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const cart = useCart()
  const wishlist = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={cx('header', scrolled && 'is-scrolled')}>
        <div className="announce">
          <div className="container announce__inner">
            <span>{business.locality}</span>
            <span aria-hidden="true">·</span>
            <span>{business.hours.summary}</span>
            <a href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to enquire about your collection.')} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="container header__inner">
          <Brand />

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => cx('nav__link', isActive && 'is-active')}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="icon-btn"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <Icon name="search" />
            </button>
            <NavLink
              to="/products?view=wishlist"
              className="icon-btn icon-btn--hide-sm"
              aria-label="Wishlist"
            >
              <Icon name="heart" />
              {wishlist.ids.length > 0 && (
                <span className="icon-btn__count">{wishlist.ids.length}</span>
              )}
            </NavLink>
            <button
              type="button"
              className="icon-btn"
              aria-label={`Open cart, ${cart.count} items`}
              onClick={cart.openDrawer}
            >
              <Icon name="bag" />
              {cart.count > 0 && <span className="icon-btn__count">{cart.count}</span>}
            </button>
            <a
              href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to enquire about your collection.')}
              className="icon-btn icon-btn--whatsapp icon-btn--hide-sm"
              aria-label="Chat on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
            </a>
            <button
              type="button"
              className="icon-btn header__burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  )
}

export default Header
