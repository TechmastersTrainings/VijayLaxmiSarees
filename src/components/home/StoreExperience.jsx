import storeImage from '../../assets/brand/store-bidar.webp'
import { business, whatsappMessage } from '../../data/business'
import Button from '../common/Button'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.full)}`

export const StoreExperience = () => (
  <section className="section section--paper">
    <div className="container">
      <div className="split split--reverse">
        <Reveal className="split__media split__media--store">
          <span className="split__frame" aria-hidden="true" />
          <img
            src={storeImage}
            alt="Sri Vijaylaxmi Silks store at Shivam Complex, Bidar"
            width="256"
            height="256"
            loading="lazy"
          />
        </Reveal>
        <Reveal className="split__content" delay={100}>
          <span className="eyebrow">Visit the store</span>
          <h2 style={{ margin: '0.6rem 0 0.9rem' }}>A whole family wardrobe under one roof</h2>
          <p className="lede">
            {business.intro}
          </p>

          <ul className="pd__assurance" style={{ maxWidth: '52ch' }}>
            <li>
              <Icon name="map-pin" size={18} />
              <span>
                <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{business.name}</strong>
                <br />
                {business.address.line1}, {business.address.line2}, {business.address.city},{' '}
                {business.address.state} {business.address.postalCode}
              </span>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>
                {business.hours.summary} — please confirm timings on WhatsApp before visiting.
              </span>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={`tel:${business.contact.phoneE164}`} style={{ color: 'var(--ink)' }}>
                {business.contact.phoneDisplay}
              </a>
            </li>
          </ul>

          <div className="hero__actions" style={{ marginTop: '1.4rem' }}>
            <Button href={mapsUrl} variant="primary">
              <Icon name="map-pin" size={16} /> Get Directions
            </Button>
            <Button
              href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to know more about the store and your collection.')}
              variant="whatsapp"
            >
              <Icon name="whatsapp" size={16} /> Chat With Us
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

export default StoreExperience