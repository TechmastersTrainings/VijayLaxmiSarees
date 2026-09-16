import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cx } from '../../utils/format'
import { business, whatsappMessage } from '../../data/business'
import { useScrollLock } from '../../hooks/useScrollLock'
import Icon from '../common/Icon'
import Brand from './Brand'
import navItems from './navItems'

export const MobileMenu = ({ open, onClose }) => {
  const { pathname } = useLocation()
  useScrollLock(open)

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className={cx('mobile-menu', open && 'is-open')} aria-hidden={!open}>
      <div className="mobile-menu__panel">
        <div className="mobile-menu__top">
          <Brand onClick={onClose} />
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className="mobile-menu__list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cx('mobile-menu__link', isActive && 'is-active')
                  }
                  tabIndex={open ? 0 : -1}
                >
                  {item.label}
                  <Icon name="arrow-up-right" size={18} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__foot">
          <a
            href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to enquire about your collection.')}
            className="btn btn--whatsapp btn--block"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
          >
            <Icon name="whatsapp" size={18} /> Enquire on WhatsApp
          </a>
          <a href={`tel:${business.contact.phoneE164}`} className="btn btn--outline btn--block" tabIndex={open ? 0 : -1}>
            <Icon name="phone" size={18} /> {business.contact.phoneDisplay}
          </a>
          <p className="mobile-menu__meta">
            {business.address.line1}, {business.address.line2}, {business.address.city} —{' '}
            {business.address.postalCode}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
