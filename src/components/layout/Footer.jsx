import { Link } from 'react-router-dom'
import { business, whatsappMessage } from '../../data/business'
import Icon from '../common/Icon'
import navItems from '../navigation/navItems'
import logo from '../../assets/brand/sri-vijaylaxmi-silks-logo.png'

export const Footer = () => {
  const year = new Date().getFullYear()
  const { address, contact, social } = business

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="brand" style={{ marginBottom: '0.9rem' }}>
              <img className="brand__mark" src={logo} alt="" width="42" height="42" />
              <span className="brand__text">
                <span className="brand__name" style={{ color: 'var(--cream)' }}>
                  Sri Vijaylaxmi
                </span>
                <span className="brand__sub">Silks · Bidar</span>
              </span>
            </div>
            <p>
              Silk sarees, designer drapes and wedding wear in Bidar — Kanchipuram, Banarasi,
              Venkatgiri, tissue and more.
            </p>
            <div className="footer__social">
              <a
                href={social.instagram.url}
                aria-label={`${business.name} on Instagram`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href={social.youtube.url}
                aria-label={`${business.name} on YouTube`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="youtube" size={18} />
              </a>
              <a
                href={whatsappMessage('Hello Sri Vijaylaxmi Silks!')}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="footer__head">Explore</h3>
            <ul className="footer__list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/instagram">Instagram</Link>
              </li>
              <li>
                <Link to="/youtube">YouTube</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="footer__head">Visit Us</h3>
            <ul className="footer__list">
              <li>{address.line1}</li>
              <li>{address.line2}</li>
              <li>
                {address.city}, {address.state} {address.postalCode}
              </li>
              <li style={{ marginTop: '0.8rem' }}>
                <a href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay}</a>
              </li>
              <li>{business.hours.summary}</li>
            </ul>
          </div>

          <div>
            <h3 className="footer__head">Enquiries</h3>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'rgba(251,247,240,0.72)', marginBottom: '1rem' }}>
              Message us for prices, availability and new arrivals.
            </p>
            <a
              href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to enquire about your collection.')}
              className="btn btn--whatsapp btn--sm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginBottom: '0.6rem' }}
            >
              <Icon name="whatsapp" size={16} /> WhatsApp Us
            </a>
            <br />
            <a href={social.instagram.url} className="btn btn--outline btn--sm" style={{ borderColor: 'rgba(251,247,240,0.3)', color: 'var(--cream)' }} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={16} /> {social.instagram.handle}
            </a>
          </div>
        </div>

        <p className="footer__disclaimer">
          Store details, timings and phone number are shown as published publicly and are subject
          to confirmation by the store. Prices displayed on this website are catalogue prices and
          are confirmed by our team before purchase. Product colours may vary slightly from
          photographs due to lighting.
        </p>

        <div className="footer__bottom">
          <span>
            © {year} {business.name}, {address.city}.
          </span>
          <span>
            {social.instagram.followers} on Instagram · {social.youtube.subscribers} on YouTube
          </span>
          <Link to="/admin" className="footer__admin">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
